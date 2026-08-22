# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BitWatch (比特观察) is a single-file Bitcoin wallet observation tool built as a Progressive Web App. It allows users to track multiple Bitcoin addresses and view real-time on-chain data without managing private keys. All data is encrypted and stored locally in the browser.

**Architecture**: Single-page HTML application with Vue.js 3 Composition API, Tailwind CSS, and Web Crypto API. No build process required. All dependencies are self-hosted for long-term stability.

## Key Files

- **index.html** - Main application file (the app itself, overwritten each release). Contains all HTML, CSS, Vue.js logic, and WebAuthn implementation (~1600 lines)
- **sw.js** - Service Worker for offline caching and PWA update detection (prompt mode)
- **manifest.json** - PWA manifest for iOS/Android home screen installation
- **bitwatch_V*.html** - Historical versioned snapshots (kept for git history; no longer the live app)
- **libs/** - Self-hosted libraries (Tailwind CSS, Vue.js, Font Awesome)

## Development Workflow

### Local Testing
```bash
# Start local HTTP server (required for WebAuthn/Service Worker)
python3 -m http.server 8080

# Access on same device
http://localhost:8080/index.html

# Access from mobile device (iPhone)
http://[YOUR_MAC_IP]:8080/index.html
```

### Deployment
The project is deployed to GitHub Pages. When ready to publish:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Access at: `https://[username].github.io/WatchWallet/`

### Self-Hosted Libraries
All JavaScript and CSS dependencies are hosted locally in the `libs/` directory:
- **libs/js/** - Vue.js 3.5.22 (153KB), Tailwind CSS 4.1.13 (250KB)
- **libs/css/** - Font Awesome 6.4.0 CSS (100KB)
- **libs/webfonts/** - Font Awesome font files (woff2 format, ~276KB total)

This ensures the application works indefinitely without external CDN dependencies.

## Code Architecture

### Vue.js Application Structure (inside index.html)

The application uses Vue 3 Composition API with the following reactive state:

**Authentication & Security:**
- `isUnlocked` - Whether user has unlocked the app with password
- `currentPassword` - Stored password for encrypting/decrypting address list
- `webAuthnAvailable` / `webAuthnEnabled` - Biometric authentication state

**Address Management:**
- `addressList` - Array of watched addresses with labels and balance data
- `detailAddress` - Currently selected address for viewing transactions
- `transactions` - Transaction history for selected address

**Network Data:**
- `fees` - Current Bitcoin network fee estimates (fastest, hourFee, economyFee, minimumFee)
- `btcToCnyRate` - Current BTC to CNY exchange rate

### Critical Functions

**Encryption/Decryption (PBKDF2 + AES-GCM):**
- `encryptData(password, plaintext)` - Encrypts data with AES-256-GCM, generates random salt
- `decryptData(password, encryptedBase64)` - Decrypts data, extracts salt from encrypted payload
- Storage format: `base64(salt || iv || encryptedData)`

**WebAuthn Biometric Authentication:**
- `checkWebAuthnAvailability()` - Detects Face ID/Touch ID support
- `registerWebAuthnCredential()` - Registers platform authenticator
- `verifyWebAuthnCredential()` - Validates biometric authentication
- `encryptAndStorePassword()` - Encrypts password with AES-256-GCM for biometric unlock
- `decryptStoredPassword()` - Decrypts password after biometric verification

**API Integration (Multi-source fallback):**
- `fetchFeeEstimates()` - Tries 3 fee rate sources: mempool.space → blockstream.info → blockchain.com
- `fetchBtcToCnyRate()` - Tries 4 exchange rate sources: blockchain.info → coinbase → coingecko → cryptocompare
- `fetchAddressBalance()` - Gets confirmed/unconfirmed balance and UTXO count
- `fetchAddressTransactions()` - Retrieves transaction history for address

### API Rate Limiting

**Critical**: APIs have rate limits. Use delays between requests:
- 1000ms delay between sequential address refreshes
- 5-10s timeouts on fetch requests to avoid hanging
- Abort controllers to cancel slow requests

### Version Management

The app uses a **stable `index.html` entry point overwritten each release** (same mechanism as the CalorieCounter PWA: `vite-plugin-pwa`'s `prompt` mode, ported to vanilla JS). The Service Worker byte-diffs `sw.js`; when `sw.js` bytes change, the new SW installs into "waiting", the page shows an "发现新版本 / 更新" banner, and tapping **更新** activates the new SW and reloads into fresh assets. Auto-update works for browser sessions and **Add to Home Screen** installs alike (iOS foreground check via `visibilitychange` + hourly interval).

#### Auto-commit-hash SW updates (no manual version bump needed)

`sw.js` carries a `BUILD_HASH` constant that participates in `CACHE_NAME`. A **`post-commit` git hook** (`.git/hooks/post-commit`, not tracked by git) automatically rewrites `BUILD_HASH` to the current commit's short hash after every commit, then `git commit --amend --no-edit` folds the change into that same commit. Result: **every commit changes `sw.js` bytes → the SW update banner always fires on the next visit**, with no need to bump any version number.

- `BUILD_HISTORICAL_VERSION` (`sw.js`) — semantic version, matches `VERSION` in `index.html`. Bump only for a real release label; it does NOT drive update detection.
- `BUILD_HASH` (`sw.js`) — injected by the hook; drives the byte change that triggers SW update.
- `VERSION` (`index.html`) — display only (shown next to the app title). Does NOT participate in update detection.

**When publishing changes:**
1. Edit the code (`index.html` / `sw.js` / etc.) — bump `BUILD_HISTORICAL_VERSION` + `VERSION` only if you want a new visible version label; otherwise leave them.
2. `git commit` — the post-commit hook auto-injects the commit hash into `sw.js` `BUILD_HASH` and amends. (If the hook is missing on a machine, see "Reinstalling the hook" below.)
3. `git push origin main` — GitHub Pages deploys; users see the update banner on next foreground/refresh.

**Self-reference caveat:** `git commit --amend` produces a *new* hash, so the value written into `BUILD_HASH` is the pre-amend HEAD short hash, not exactly the final commit's hash. This is fine — `BUILD_HASH` only needs to differ every commit to drive SW byte-change detection; it does not need to equal its own commit.

#### Reinstalling the hook (`.git/hooks/post-commit`)

The hook is not tracked by git. On a fresh clone, recreate it:

```bash
cat > .git/hooks/post-commit <<'HOOK'
#!/usr/bin/env bash
set -euo pipefail
# Re-entrancy guard: the hook itself runs `git commit --amend`, which would
# re-trigger post-commit recursively. Skip when already inside this hook.
[ -n "${BITWATCH_HOOK:-}" ] && exit 0
export BITWATCH_HOOK=1
cd "$(git rev-parse --show-toplevel)"
SW="sw.js"
[ -f "$SW" ] || exit 0
HEAD_HASH=$(git rev-parse --short HEAD)
python3 - "$SW" "$HEAD_HASH" <<'PY'
import re, sys
path, h = sys.argv[1], sys.argv[2]
s = open(path).read()
new, n = re.subn(r"^(const BUILD_HASH = ')[^']*(';.*)$", r"\g<1>" + h + r"\g<2>", s, count=1, flags=re.M)
if n == 0 or new == s:
    sys.exit(0)
open(path, 'w').write(new)
PY
if ! git diff --quiet -- "$SW"; then
    git add "$SW"
    git commit --amend --no-edit --no-verify >/dev/null 2>&1 || true
fi
HOOK
chmod +x .git/hooks/post-commit
```

**Never create new versioned HTML files** (e.g. `bitwatch_V6.1.html`) — the whole update mechanism depends on a single stable entry point. Old `bitwatch_V*.html` files are kept for git history/rollback but are no longer the live app.

**Note:** Home-screen installs pinned to an old `bitwatch_V*.html` under the legacy no-update SW are stuck on that version — the old SW has no update flow to deliver the new one. Those users need a one-time manual re-add of the app (now pointing at `index.html`) to start receiving auto-updates. New installs get auto-updates from here on.

## Security Considerations

- All password/address data is encrypted with AES-256-GCM before localStorage
- WebAuthn credentials use platform authenticator (device-bound, cannot be exported)
- Encrypted password for biometric unlock includes random IV and AES key
- Service Worker only caches http/https resources (no chrome-extension:// or other protocols)
- This is a read-only tool - no private keys are ever stored or handled

## iOS PWA Setup

Users install to home screen via Safari:
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"

The app runs in standalone mode with:
- Custom app icon (icon-192.png, icon-512.png)
- Orange theme color (#f97316)
- Status bar integration
- Service Worker for offline functionality

## Common Issues

**Service Worker errors with chrome-extension:// protocol:**
- Fix: Check protocol before caching: `if (!event.request.url.startsWith('http')) { return; }`

**API rate limiting (429 errors):**
- Fix: Increase delays between requests, implement proper fallback sources

**WebAuthn not available:**
- Requires HTTPS or localhost
- Only works on devices with Face ID/Touch ID/Windows Hello
- Check `navigator.credentials` and `PublicKeyCredential` availability

**String replacement failures in Edit tool:**
- Fix: Use exact strings from Read tool output, preserve line numbers and whitespace
