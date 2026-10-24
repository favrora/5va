#!/usr/bin/python3 -I
"""Root-installed, forced-command receiver for the fiveva static site only."""
from __future__ import annotations

import datetime
import fcntl
import json
import os
from pathlib import Path, PurePosixPath
import pwd
import re
import resource
import shutil
import signal
import sys
import tarfile
import tempfile
import uuid
from html.parser import HTMLParser
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

BASE = Path('/home/fiveva')
DOMAIN = '5varepair.com'
ORIGIN = 'https://' + DOMAIN
SHA = re.compile(r'[0-9a-f]{40}')
SEGMENT = re.compile(r'[A-Za-z0-9_][A-Za-z0-9._-]*')
EXTENSIONS = {'.html', '.css', '.js', '.mjs', '.svg', '.png', '.jpg', '.jpeg',
              '.webp', '.gif', '.avif', '.ico', '.txt', '.xml', '.json', '.woff',
              '.woff2', '.ttf', '.otf', '.webmanifest'}
MAX_COMPRESSED = 64 * 1024 * 1024
MAX_EXPANDED = 128 * 1024 * 1024
MAX_FILE = 16 * 1024 * 1024
MAX_FILES = 10000


class DeployError(Exception):
    pass


class HeadMetadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.robots = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'link' and values.get('rel') == 'canonical':
            self.canonicals.append(values.get('href', ''))
        if tag == 'meta' and values.get('name', '').lower() == 'robots':
            self.robots.append(values.get('content', '').lower())


def valid_sha(value):
    if not SHA.fullmatch(value):
        raise DeployError('Expected a full lowercase 40-character Git commit SHA')
    return value


def safe_member_path(name):
    path = PurePosixPath(name)
    if path.is_absolute() or '..' in path.parts:
        raise DeployError('Unsafe archive path')
    if not path.parts:  # tar's leading ./ directory
        return None
    if len(str(path)) > 512 or any(not SEGMENT.fullmatch(p) for p in path.parts):
        raise DeployError('Unsupported archive path')
    return path


def unpack_archive(archive_path, destination):
    seen = set()
    total = 0
    count = 0
    with tarfile.open(archive_path, mode='r:gz') as archive:
        for member in archive:
            relative = safe_member_path(member.name)
            if relative is None:
                if not member.isdir():
                    raise DeployError('Invalid root archive member')
                continue
            if str(relative) in seen:
                raise DeployError('Duplicate archive member')
            seen.add(str(relative))
            count += 1
            if count > MAX_FILES:
                raise DeployError('Too many archive members')
            if not (member.isfile() or member.isdir()) or member.issparse():
                raise DeployError('Links, devices and sparse files are forbidden')
            target = destination.joinpath(*relative.parts)
            if member.isdir():
                if member.size != 0:
                    raise DeployError('Directory entries must have no payload')
                target.mkdir(parents=True, exist_ok=True, mode=0o755)
                continue
            if relative.suffix.lower() not in EXTENSIONS:
                raise DeployError('Only static web assets may be deployed')
            if member.size < 0 or member.size > MAX_FILE:
                raise DeployError('Individual file size limit exceeded')
            total += member.size
            if total > MAX_EXPANDED:
                raise DeployError('Expanded archive size limit exceeded')
            target.parent.mkdir(parents=True, exist_ok=True, mode=0o755)
            source = archive.extractfile(member)
            if source is None:
                raise DeployError('Cannot read archive file')
            with source, target.open('xb') as output:
                shutil.copyfileobj(source, output, length=1024 * 1024)
            target.chmod(0o644)
    if not count:
        raise DeployError('Empty release archive')


def validate_site(directory):
    for required in ('index.html', '404.html', 'robots.txt', 'sitemap.xml'):
        if not (directory / required).is_file():
            raise DeployError('Missing production website file: ' + required)
    metadata = HeadMetadata()
    metadata.feed((directory / 'index.html').read_text(encoding='utf-8'))
    if metadata.canonicals != [ORIGIN + '/']:
        raise DeployError('Production homepage canonical does not match ' + ORIGIN)
    if not metadata.robots or any('noindex' in value for value in metadata.robots):
        raise DeployError('Production homepage is not indexable')
    robots = (directory / 'robots.txt').read_text(encoding='utf-8')
    if re.search(r'^\s*Disallow\s*:\s*/\s*$', robots, re.MULTILINE | re.IGNORECASE):
        raise DeployError('Production robots.txt blocks the entire site')
    if ORIGIN + '/sitemap.xml' not in robots:
        raise DeployError('Production sitemap is missing from robots.txt')
    document = ET.fromstring((directory / 'sitemap.xml').read_text(encoding='utf-8'))
    locations = [node.text or '' for node in document.iter() if node.tag.split('}')[-1] == 'loc']
    if not locations or any(urlsplit(url).scheme != 'https' or urlsplit(url).netloc != DOMAIN
                            for url in locations):
        raise DeployError('Sitemap contains an unexpected origin')


def activate_release(base, commit):
    valid_sha(commit)
    releases = base / 'releases'
    release = releases / commit
    if release.is_symlink() or release.resolve().parent != releases.resolve() or not release.is_dir():
        raise DeployError('Release directory does not exist or is unsafe')
    validate_site(release)
    live = base / 'htdocs' / DOMAIN
    if live.exists() and not live.is_symlink():
        raise DeployError('Bootstrap required: live site must be a release symlink, not a directory')
    previous = None
    if live.is_symlink():
        resolved = live.resolve(strict=True)
        if resolved.parent != releases.resolve() or not SHA.fullmatch(resolved.name):
            raise DeployError('Existing site symlink is outside managed releases')
        previous = resolved.name
    live.parent.mkdir(parents=True, exist_ok=True, mode=0o755)
    temporary = live.parent / ('.fiveva-next-' + uuid.uuid4().hex)
    try:
        temporary.symlink_to(release)
        os.replace(temporary, live)
    finally:
        temporary.unlink(missing_ok=True)
    if previous and previous != commit:
        record = base / '.fiveva-previous-release'
        temporary_record = base / ('.fiveva-previous-' + uuid.uuid4().hex)
        temporary_record.write_text(previous + '\n', encoding='ascii')
        temporary_record.chmod(0o600)
        os.replace(temporary_record, record)
    return {'commit': commit, 'previousCommit': previous, 'origin': ORIGIN}


def deploy_archive(base, commit, stream):
    valid_sha(commit)
    releases = base / 'releases'
    releases.mkdir(parents=True, exist_ok=True, mode=0o755)
    incoming = base / '.fiveva-incoming'
    incoming.mkdir(parents=True, exist_ok=True, mode=0o700)
    incoming.chmod(0o700)
    release = releases / commit
    if release.exists() or release.is_symlink():
        # Idempotent workflow retries keep the existing immutable artifact. Consume a bounded
        # upload so the SSH client can finish normally, then re-activate the verified release.
        count = 0
        while True:
            chunk = stream.read(1024 * 1024)
            if not chunk:
                break
            count += len(chunk)
            if count > MAX_COMPRESSED:
                raise DeployError('Compressed upload size limit exceeded')
        if release.is_symlink():
            raise DeployError('Release path must not be a symlink')
        marker = json.loads((release / 'release.json').read_text(encoding='utf-8'))
        if marker.get('commit') != commit or marker.get('origin') != ORIGIN:
            raise DeployError('Existing immutable release metadata does not match')
        return activate_release(base, commit)
    stage = Path(tempfile.mkdtemp(prefix='.stage-', dir=releases))
    stage.chmod(0o755)
    archive_path = None
    try:
        descriptor, archive_name = tempfile.mkstemp(prefix='upload-', suffix='.tar.gz', dir=incoming)
        archive_path = Path(archive_name)
        count = 0
        with os.fdopen(descriptor, 'wb') as output:
            while True:
                chunk = stream.read(1024 * 1024)
                if not chunk:
                    break
                count += len(chunk)
                if count > MAX_COMPRESSED:
                    raise DeployError('Compressed upload size limit exceeded')
                output.write(chunk)
        unpack_archive(archive_path, stage)
        validate_site(stage)
        stamp = {'commit': commit, 'deployedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                 'origin': ORIGIN}
        marker = stage / 'release.json'
        marker.write_text(json.dumps(stamp) + '\n', encoding='utf-8')
        marker.chmod(0o644)
        os.replace(stage, release)
        return activate_release(base, commit)
    finally:
        if stage.exists():
            shutil.rmtree(stage)
        if archive_path:
            archive_path.unlink(missing_ok=True)


def main():
    if os.geteuid() != pwd.getpwnam('fiveva').pw_uid:
        raise DeployError('Receiver must run as the isolated fiveva user')
    command = os.environ.get('SSH_ORIGINAL_COMMAND', '')
    match = re.fullmatch(r'(deploy|activate) ([0-9a-f]{40})', command)
    if not match:
        raise DeployError('Only deploy <commit-sha> and activate <commit-sha> are allowed')
    # Bound even tar metadata (PAX/GNU long-name decompression) before parsing it.
    resource.setrlimit(resource.RLIMIT_AS, (256 * 1024 * 1024, 256 * 1024 * 1024))
    resource.setrlimit(resource.RLIMIT_CPU, (60, 60))
    signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(DeployError('Deployment timed out')))
    signal.alarm(180)
    os.umask(0o022)
    with (BASE / '.fiveva-deploy.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if match[1] == 'deploy':
            result = deploy_archive(BASE, match[2], sys.stdin.buffer)
        else:
            result = activate_release(BASE, match[2])
    print(json.dumps(result))


if __name__ == '__main__':
    try:
        main()
    except (DeployError, OSError, tarfile.TarError, ET.ParseError, UnicodeError, ValueError, EOFError, MemoryError) as error:
        print('Deployment rejected: ' + str(error), file=sys.stderr)
        sys.exit(1)
