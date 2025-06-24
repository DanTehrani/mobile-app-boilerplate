import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Platform } from 'react-native';
import {
  ASYNC_STORAGE_KEYS,
  CONFIG_NOTIFICATION_LATER_KEY,
} from './asyncStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { SECURE_STORAGE_KEYS, USER_ID_KEY } from './secureStorageKeys';
import * as Updates from 'expo-updates';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const triggerHapticFeedback = () => {
  if (Platform.OS === 'ios') {
    ReactNativeHapticFeedback.trigger('longPress', hapticOptions);
  }
};

/**
 * Clear all async storage values
 */
export const clearAsyncStorage = async () => {
  await Promise.all(
    ASYNC_STORAGE_KEYS.map(key => AsyncStorage.removeItem(key))
  );
};

export const clearSecureStorage = async () => {
  await Promise.all(
    SECURE_STORAGE_KEYS.map(key => SecureStore.deleteItemAsync(key as string))
  );
};

export const getUserId = async () => {
  const userId = await SecureStore.getItemAsync(USER_ID_KEY);
  return userId;
};

export const setUserId = async (userId: string) => {
  await SecureStore.setItemAsync(USER_ID_KEY, userId);
};

export const clearUserId = async () => {
  await SecureStore.deleteItemAsync(USER_ID_KEY);
};

export const getConfigNotificationLater = async () => {
  const intent = await AsyncStorage.getItem(CONFIG_NOTIFICATION_LATER_KEY);
  return intent === 'true';
};

export const setConfigNotificationLater = async (intent: boolean) => {
  await AsyncStorage.setItem(CONFIG_NOTIFICATION_LATER_KEY, intent.toString());
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const applyUpdate = async () => {
  if (Device.isDevice && !__DEV__) {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  }
};

export const getExpoPushToken = async (): Promise<string | null> => {
  try {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error('Project ID not found');
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    return token;
  } catch (_e) {
    return null;
  }
};
