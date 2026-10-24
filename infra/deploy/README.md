# 5VA static production deployment

Target: `https://5varepair.com`, dedicated user `fiveva` on the existing Virginia production host. The resource's legacy name `beautyai-staging-us-1` does not make it a staging server. This pipeline must never write to the Beauty AI, Kiosk or administration roots.

## Layout and privileges

- Root-owned receiver: `/usr/local/libexec/fiveva-deploy` (copy `receiver.py`, owner root:root, mode 0755). Its isolated Python shebang ignores user Python environment/package settings.
- Isolated release directories: `/home/fiveva/releases/<full-40-character-Git-SHA>`.
- Nginx document root: `/home/fiveva/htdocs/5varepair.com`, an atomic symlink to one release.
- Private uploads and deployment lock live directly under `/home/fiveva`, outside the served tree.
- The dedicated SSH key's only entry in `authorized_keys` must start with `restrict,command="/usr/local/libexec/fiveva-deploy"`. This key has no shell, sudo, SFTP, forwarding, agent or PTY access. It accepts only `deploy <sha>` with a gzip tar archive on stdin, or `activate <sha>` for an existing verified release. Do not reuse the Ubuntu administrator key.
- Archive links/devices, traversal, hidden paths, server-side code and unsupported extensions are rejected. Upload/expanded/file/member limits and CPU/address-space/time limits bound malformed archives. A successful artifact must have the production canonical, indexable homepage, nonblocking robots.txt and correct-origin sitemap. No uploaded command is executed.
- No production runtime dependency installation, PHP service or Node.js server is needed. Build only on GitHub's runner; transmit `website/dist/` only.

## One-time setup (root operator)

The root operator verifies domain registration and DNS, then creates only this static site through CloudPanel:

```text
clpctl site:add:static --domainName=5varepair.com --siteUser=fiveva --siteUserPassword=<private-generated-password>
clpctl lets-encrypt:install:certificate --domainName=5varepair.com --subjectAlternativeName=www.5varepair.com
```

Those are setup references, not instructions to expose a password in shell history, logs or Git. The existing `clpctl` prints its supported command examples when called without arguments; `--help` is not supported by this installed version. Both apex and www DNS must point to this host before certificate issuance.

After saving its placeholder directory outside the served path, replace CloudPanel's new `htdocs/5varepair.com` directory with the managed release symlink. The receiver intentionally refuses to replace a directory or an unrelated existing symlink. The root operator must validate Nginx configuration and all existing production virtual hosts before a graceful Nginx reload; do not reboot or restart the server. Configure proper directory index routing, real 404 status, HTTP/www canonical redirects and cache/security headers only in the new 5VA vhost. Preserve certificate renewal/challenge behavior.

Install the dedicated public deploy key with the forced command, then put its private key into the repository's `FIVEVA_DEPLOY_KEY` Actions secret through stdin. Put the **independently verified existing host key** for `18.211.218.92` into `FIVEVA_KNOWN_HOSTS`. Do not trust an unverified CI-time `ssh-keyscan`, disable host-key checks or store credentials in tracked files. Keys must not permit access to the other applications.

## GitHub main workflow

`.github/workflows/deploy-production.yml` runs only for `favrora/5va` on `main` (or a manual run targeting that branch). The generated `codex/preview` branch remains separate and cannot trigger production deployment.

The workflow pins checkout/setup-node to verified official release commit SHAs, installs locked dependencies, runs seven receiver safety tests plus the website build/tests/HTML/release-origin checks and existing routing tests, and uploads only the tested static artifact. The production gate is explicit:

```text
SITE_ENV=production
SITE_URL=https://5varepair.com
```

The receiver locks concurrent deployments, validates an isolated staging directory, writes a public non-sensitive `release.json` commit marker, moves it into its immutable release directory and atomically switches the live symlink. It does not reload Nginx. The uploader verifies that HTTPS returns the intended commit. Workflow retries for an existing SHA consume the bounded upload, retain its original immutable artifact and re-activate it; they do not overwrite a release.

Archive extraction and failed upload staging are the only automatic cleanup. Existing releases are deliberately retained for rollback. Future retention is a separate maintenance policy scoped only to the 5VA release directory.

## Rollback

`/home/fiveva/.fiveva-previous-release` records the previous commit outside the served tree. A trusted operator can run the same restricted connection with `activate <previous-full-SHA>`. No upload, Nginx reload, DNS change or application restart is required. Verify HTTPS homepage, a service/article route and `release.json` after rollback. This reverses the website artifact only; DNS, certificates, Google Business Profile and Ads require their own explicit recorded rollback.

## Local verification

```sh
python3 -m unittest discover -s infra/deploy -p 'test_*.py' -v
bash -n infra/deploy/upload-release.sh
```

These tests cover valid atomic activation, rollback and workflow retry; traversal/hidden/server-side files; symlinks/hardlinks/devices; wrong-origin/noindex/blocked releases; archive size limits; protected pre-existing document roots; and shell-like invalid SHAs. They do not claim that server keys, HTTPS or GitHub secrets have been configured. Live evidence must be recorded separately after installation.
