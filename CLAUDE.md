# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BitWatch (比特观察) is a single-file Bitcoin wallet observation tool built as a Progressive Web App. It allows users to track multiple Bitcoin addresses and view real-time on-chain data without managing private keys. All data is encrypted and stored locally in the browser.

**Architecture**: Single-page HTML application with Vue.js 3 Composition API, Tailwind CSS, and Web Crypto API. No build process required. All dependencies are self-hosted for long-term stability.

## Key Files

- **bitwatch_V4.1.html** - Main application file containing all HTML, CSS, Vue.js logic, and WebAuthn implementation (~1200 lines)
- **sw.js** - Service Worker for offline caching and PWA support
- **manifest.json** - PWA manifest for iOS/Android home screen installation
- **index.html** - Simple redirect page to latest version
- **libs/** - Self-hosted libraries (Tailwind CSS, Vue.js, Font Awesome)

## Development Workflow

### Local Testing
```bash
# Start local HTTP server (required for WebAuthn/Service Worker)
python3 -m http.server 8080

# Access on same device
http://localhost:8080/bitwatch_V4.1.html

# Access from mobile device (iPhone)
http://[YOUR_MAC_IP]:8080/bitwatch_V4.1.html
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

### Vue.js Application Structure (inside bitwatch_V3.1.html)

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

When publishing new versions:
1. Create new HTML file with version number (e.g., `bitwatch_V3.2.html`)
2. Update `manifest.json` start_url to new version
3. Update `index.html` redirect to new version
4. Update Service Worker `CACHE_NAME` and `urlsToCache` array
5. Commit all changes together

**Never overwrite existing versioned files** - preserves git history and allows easy rollback.

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
