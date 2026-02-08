# 🎛️ Haptic Soundboard

A premium **Haptic Drum Machine** built with React Native & Expo. Features a cyberpunk glassmorphism UI, polyphonic audio, and satisfying haptic feedback.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📥 Download

| Platform | Link |
|----------|------|
| 🌐 **Web App** | [haptic-soundboard-tau.vercel.app](https://haptic-soundboard-tau.vercel.app) |
| 📱 **Android APK** | [Download from Expo](https://expo.dev/accounts/ritesh1918/projects/haptic-soundboard/builds/8635f094-ca24-4d77-8779-84ed58be42f5) |
| 📲 **Expo Go** | Scan QR code below ↓ |

### 📲 Scan to Install (Android)

<p align="center">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://expo.dev/accounts/ritesh1918/projects/haptic-soundboard/builds/8635f094-ca24-4d77-8779-84ed58be42f5" alt="Download APK QR Code" />
</p>

<p align="center"><em>Scan with your phone camera to download the APK</em></p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Cyberpunk UI** | Dark gradient background with glassmorphism pads |
| 🥁 **6 Drum Pads** | Kick, Snare, Hi-Hat, Clap, Bass, Vox |
| 📳 **Haptic Feedback** | Heavy impact vibration on every tap |
| 🔊 **Polyphonic Audio** | Sounds overlap naturally (no cutoff) |
| ⚡ **Smooth Animations** | 60fps scale + border flash using Reanimated |
| 🚀 **Boot Sequence** | Premium "System Initializing" loading screen |

---

## 🛠️ Tech Stack

- **Framework:** React Native (Expo SDK 54)
- **Animation:** `react-native-reanimated`
- **Audio:** `expo-av`
- **Haptics:** `expo-haptics`
- **Styling:** `expo-linear-gradient` + StyleSheet

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
# Clone the repository
git clone git@github.com:ritesh-1918/Haptic-Soundboard.git
cd Haptic-Soundboard

# Install dependencies
npm install

# Start the development server
npx expo start -c
```

### Running on Device
1. Scan the QR code with **Expo Go** (Android) or **Camera** (iOS)
2. Wait for the bundle to load
3. Start drumming! 🥁

---

## 📁 Project Structure

```
haptic-soundboard/
├── app/
│   └── (tabs)/
│       └── index.tsx    # Main soundboard screen
├── assets/
│   └── sounds/          # Local WAV audio files
│       ├── kick.wav
│       ├── snare.wav
│       ├── hihat.wav
│       ├── clap.wav
│       ├── bass.wav
│       └── vox.wav
└── package.json
```

---

## 🎨 Sound Kit

| Pad | Color | Sound |
|-----|-------|-------|
| KICK | `#F72585` | Deep bass drum |
| SNARE | `#4CC9F0` | Crisp snare hit |
| HI-HAT | `#F72585` | Closed hi-hat |
| CLAP | `#4361EE` | Hand clap |
| BASS | `#7209B7` | Sub bass boom |
| VOX | `#3A0CA3` | Tink effect |

---

## 📱 Building for Production

### Generate APK (Android)
```bash
npx eas build --platform android --profile preview
```

### Generate IPA (iOS)
```bash
npx eas build --platform ios --profile preview
```

> Note: You'll need an [Expo account](https://expo.dev/) and EAS CLI configured.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more sound packs
- Improve animations
- Add recording/playback features

---

## 📄 License

MIT © [Ritesh](https://github.com/ritesh-1918)

---

<p align="center">
  Made with ❤️ using React Native & Expo
</p>
