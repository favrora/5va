import importlib.util
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location('receiver', Path(__file__).with_name('receiver.py'))
r = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(r)


def valid_files(text='First release'):
    return {
        'index.html': '<!doctype html><html><head><link rel="canonical" href="https://5varepair.com/"><meta name="robots" content="index, follow"></head><body>'+text+'</body></html>',
        '404.html': '<!doctype html><html><head><meta name="robots" content="noindex"></head><body>Not found</body></html>',
        'robots.txt': 'User-agent: *\nAllow: /\nSitemap: https://5varepair.com/sitemap.xml\n',
        'sitemap.xml': '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://5varepair.com/</loc></url></urlset>',
        '_astro/style.hash.css': 'body { color: #193b35; }',
    }


def archive(files=None, extra=None):
    target = io.BytesIO()
    with tarfile.open(fileobj=target, mode='w:gz') as output:
        root = tarfile.TarInfo('.')
        root.type = tarfile.DIRTYPE
        output.addfile(root)
        for name, content in (files if files is not None else valid_files()).items():
            data = content.encode()
            member = tarfile.TarInfo(name if name.startswith('/') else './'+name)
            member.size = len(data)
            output.addfile(member, io.BytesIO(data))
        if extra is not None:
            output.addfile(extra, io.BytesIO(b'x'*extra.size) if extra.isfile() else None)
    target.seek(0)
    return target


class ReceiverTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.base = Path(self.temp.name)
        (self.base/'htdocs').mkdir()
        self.addCleanup(self.temp.cleanup)

    def test_valid_deploy_atomic_switch_rollback_and_idempotent_retry(self):
        first, second = '1'*40, '2'*40
        r.deploy_archive(self.base, first, archive())
        live = self.base/'htdocs'/r.DOMAIN
        self.assertTrue(live.is_symlink())
        self.assertEqual(live.resolve().name, first)
        r.deploy_archive(self.base, second, archive(valid_files('Second release')))
        self.assertEqual(live.resolve().name, second)
        self.assertEqual((self.base/'.fiveva-previous-release').read_text().strip(), first)
        self.assertTrue((self.base/'releases'/first/'index.html').exists())
        r.deploy_archive(self.base, second, archive(valid_files('Should not replace an immutable release')))
        self.assertIn('Second release', (live/'index.html').read_text())
        r.activate_release(self.base, first)
        self.assertEqual(live.resolve().name, first)
        marker = json.loads((live/'release.json').read_text())
        self.assertEqual(marker['commit'], first)

    def test_unexpected_paths_and_server_side_code_rejected_without_changing_live_site(self):
        r.deploy_archive(self.base, '1'*40, archive())
        for bad in ['../escape.txt', '/absolute.txt', '.ssh/authorized_keys', '.env', '.git/config', 'web.php']:
            with self.subTest(path=bad):
                data = valid_files()
                data[bad] = 'not allowed'
                with self.assertRaises(r.DeployError):
                    r.deploy_archive(self.base, '2'*40, archive(data))
                self.assertEqual((self.base/'htdocs'/r.DOMAIN).resolve().name, '1'*40)
        self.assertEqual(list((self.base/'.fiveva-incoming').iterdir()), [])
        self.assertFalse(any(p.name.startswith('.stage-') for p in (self.base/'releases').iterdir()))

    def test_links_and_device_files_rejected(self):
        for kind in (tarfile.SYMTYPE, tarfile.LNKTYPE, tarfile.CHRTYPE, tarfile.FIFOTYPE):
            member = tarfile.TarInfo('images/malicious.webp')
            member.type = kind
            member.linkname = '/etc/passwd'
            with self.subTest(kind=kind), self.assertRaises(r.DeployError):
                r.deploy_archive(self.base, '3'*40, archive(extra=member))

    def test_preview_or_wrong_domain_never_activates(self):
        for kind in ['noindex', 'wrong canonical', 'blocked robots', 'wrong sitemap']:
            files = valid_files()
            if kind == 'noindex':
                files['index.html'] = files['index.html'].replace('index, follow', 'noindex, nofollow')
            elif kind == 'wrong canonical':
                files['index.html'] = files['index.html'].replace('https://5varepair.com/', 'https://example.com/')
            elif kind == 'blocked robots':
                files['robots.txt'] += 'Disallow: /\n'
            else:
                files['sitemap.xml'] = files['sitemap.xml'].replace('https://5varepair.com/', 'https://example.com/')
            with self.subTest(kind=kind), self.assertRaises(r.DeployError):
                r.deploy_archive(self.base, '4'*40, archive(files))
            self.assertFalse((self.base/'htdocs'/r.DOMAIN).exists())

    def test_archive_size_budget_enforced(self):
        old = r.MAX_EXPANDED
        self.addCleanup(setattr, r, 'MAX_EXPANDED', old)
        r.MAX_EXPANDED = 10
        with self.assertRaises(r.DeployError):
            r.deploy_archive(self.base, '5'*40, archive())

    def test_live_directory_and_outside_symlink_are_never_replaced(self):
        live = self.base/'htdocs'/r.DOMAIN
        live.mkdir()
        (live/'important.txt').write_text('keep')
        with self.assertRaises(r.DeployError):
            r.deploy_archive(self.base, '6'*40, archive())
        self.assertEqual((live/'important.txt').read_text(), 'keep')
        (live/'important.txt').unlink()
        live.rmdir()
        live.symlink_to(self.base/'outside')
        (self.base/'outside').mkdir()
        with self.assertRaises(r.DeployError):
            r.activate_release(self.base, '6'*40)
        self.assertEqual(live.readlink(), self.base/'outside')

    def test_sha_is_not_a_shell_command(self):
        for value in ('main', 'a'*39, 'A'*40, '../bad', 'a'*40+'; id'):
            with self.subTest(value=value), self.assertRaises(r.DeployError):
                r.valid_sha(value)


if __name__ == '__main__':
    unittest.main()
