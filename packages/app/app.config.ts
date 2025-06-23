import type { ExpoConfig } from '@expo/config';

const APP_VARIANT = process.env.APP_VARIANT;

let name: string;
let iosBundleIdentifier: string;
let androidPackage: string;
let icon: string;
let adaptiveIcon: string;
let scheme: string;

switch (APP_VARIANT) {
  case 'development':
    name = 'Boilerplate (Dev)';
    iosBundleIdentifier = 'com.boilerplate.dev';
    androidPackage = 'com.boilerplate.dev';
    scheme = 'com.boilerplate.dev';
    icon = './assets/icon.png';
    adaptiveIcon = './assets/adaptive-icon.png';
    break;
  case 'staging':
    name = 'Boilerplate Staging';
    iosBundleIdentifier = 'com.boilerplate.staging';
    androidPackage = 'com.boilerplate.staging';
    scheme = 'com.boilerplate.staging';
    icon = './assets/icon-staging.png';
    adaptiveIcon = './assets/adaptive-icon.png';
    break;
  case 'production':
    name = 'Boilerplate';
    iosBundleIdentifier = 'com.boilerplate.app';
    androidPackage = 'com.boilerplate.app';
    scheme = 'com.boilerplate.app';
    icon = './assets/icon.png';
    adaptiveIcon = './assets/adaptive-icon.png';
    break;
  default:
    throw new Error(`Unknown app variant: ${APP_VARIANT}`);
}

const config: ExpoConfig = {
  newArchEnabled: true,
  name,
  slug: 'boilerplate',
  orientation: 'portrait',
  icon,
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  runtimeVersion: '1.0.0',
  version: '1.0.0',
  ios: {
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: iosBundleIdentifier,
    usesAppleSignIn: true,
  },
  scheme,
  android: {
    adaptiveIcon: {
      foregroundImage: adaptiveIcon,
      backgroundColor: '#ffffff',
    },
    package: androidPackage,
  },
  plugins: [
    [
      'expo-secure-store',
      {
        faceIDPermission: 'Allow Boilerplate to use biometric authentication.',
      },
    ],
    'expo-asset',
    ['expo-localization'],
    [
      'expo-font',
      {
        fonts: ['./assets/Nunito-Regular.ttf', './assets/Nunito-Bold.ttf'],
      },
    ],
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow Boilerplate to use biometric authentication.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow Boilerplate to access your camera',
        microphonePermission: 'Allow Boilerplate to access your microphone',
        recordAudioAndroid: true,
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'Allow Boilerplate to access your photos.',
        savePhotosPermission: 'Allow Boilerplate to save photos.',
        isAccessMediaLocationEnabled: true,
      },
    ],
    ['expo-apple-authentication'],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow Boilerplate to use your location.',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '2d4dd814-1252-436b-a369-c7297deee29b',
    },
  },
  updates: {
    url: 'https://u.expo.dev/2d4dd814-1252-436b-a369-c7297deee29b',
  },
  owner: 'raylac',
};

export default config;
