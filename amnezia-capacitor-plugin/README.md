# AmneziaWG Capacitor Plugin

This plugin allows Ionic/Capacitor apps to control AmneziaWG tunnels on Android.

## Installation

1. Install the package:
   ```bash
   npm install amnezia-capacitor-plugin
   npx cap sync
   ```

## Android Configuration

Because this plugin relies on the native AmneziaWG implementation, complete the following steps in your Android project:

1. Open `android/settings.gradle`.
2. Add the following lines to include the native Tunnel module:
   ```gradle
   include ':tunnel'
   project(':tunnel').projectDir = new File(rootProject.projectDir, '../node_modules/amnezia-capacitor-plugin/tunnel')
   ```

3. Ensure your `android/build.gradle` (Project level) or `variables.gradle` supports the required SDK versions:
   - `minSdkVersion`: 24
   - `compileSdkVersion`: 33 or higher
   - Java Version: 17

## API Usage

```typescript
import { AmneziaWG } from 'amnezia-capacitor-plugin';

// Connect to a tunnel
try {
  const config = `[Interface]
PrivateKey = ...
Address = ...
DNS = ...

[Peer]
PublicKey = ...
AllowedIPs = ...
Endpoint = ...`;

  const result = await AmneziaWG.connect({ config });
  console.log('Connected:', result.status);
} catch (e) {
  console.error('Connection failed:', e);
}

// Disconnect
await AmneziaWG.disconnect();

// Get Status
const status = await AmneziaWG.getStatus();
console.log('Current status:', status.status);
```
