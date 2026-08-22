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

The app uses a **stable `index.html` entry point overwritten each release** (same mechanism as the CalorieCounter PWA: `vite-plugin-pwa`'s `prompt` mode, ported to vanilla JS). The Service Worker byte-diffs `sw.js`; when `CACHE_VERSION` changes, the new SW installs into "waiting", the page shows an "发现新版本 / 更新" banner, and tapping **更新** activates the new SW and reloads into fresh assets. Auto-update works for browser sessions and **Add to Home Screen** installs alike (iOS foreground check via `visibilitychange` + hourly interval).

When publishing new versions:
1. Edit **`index.html`** (the app itself) — bump the `VERSION` constant near the top of `setup()`
2. Edit **`sw.js`** — bump `CACHE_VERSION` to the same value (this changes `sw.js` bytes, which drives update detection)
3. Commit both changes together and `git push origin main`
4. GitHub Pages deploys; users see the update banner on next foreground/refresh

**Never create new versioned HTML files** (e.g. `bitwatch_V6.1.html`) — the whole update mechanism depends on a single stable entry point. Old `bitwatch_V*.html` files are kept for git history/rollback but are no longer the live app.

**Note:** Home-screen installs pinned to an old `bitwatch_V*.html` under the legacy no-update SW are stuck on that version — the old SW has no update flow to deliver the new one. Those users need a one-time manual re-add of the app (now pointing at `index.html`) to start receiving auto-updates. New installs get auto-updates from here on.

**Bumping the Service Worker cache key** (why `CACHE_VERSION` matters): it is the byte-level change the browser detects when re-fetching `sw.js`. Think of it as the equivalent of Workbox's content-hash revisions — you bump it every release so the update flow triggers.

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
