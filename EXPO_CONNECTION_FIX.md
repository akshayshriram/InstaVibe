# Fixing Expo Go Connection Issues

## Problem

You're getting: `java.io.IOException. Failed to download remote Update`

## Solutions

### Solution 1: Use Tunnel Mode (Recommended)

1. Stop the current Expo server (Ctrl+C)
2. Run: `npx expo start --tunnel`
3. Wait for the tunnel to establish
4. Scan the new QR code

### Solution 2: Check Network Configuration

1. Make sure both devices are on the same WiFi network
2. Check Windows Firewall settings
3. Temporarily disable antivirus firewall

### Solution 3: Use LAN Mode with IP Address

1. Find your laptop's IP address:
   ```bash
   ipconfig
   ```
2. Look for "IPv4 Address" (usually 192.168.x.x)
3. Start Expo: `npx expo start --lan`
4. In Expo Go, manually enter: `exp://YOUR_IP:8081`

### Solution 4: Use USB Debugging (Android)

1. Enable Developer Options on your phone
2. Enable USB Debugging
3. Connect phone via USB
4. Run: `npx expo start --localhost`

### Solution 5: Clear Expo Go Cache

1. Open Expo Go app
2. Go to Settings
3. Clear cache and data
4. Restart the app

## Quick Commands to Try:

```bash
# Stop current server and restart with tunnel
npx expo start --tunnel

# Or try LAN mode
npx expo start --lan

# Or try localhost mode
npx expo start --localhost
```

## If Still Not Working:

1. Restart your phone
2. Restart your laptop
3. Try a different WiFi network
4. Use a mobile hotspot from your phone
