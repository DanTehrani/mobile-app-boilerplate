import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { trpc } from '@/lib/trpc';
import { useMutation } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { getUserId } from '@/lib/utils';

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

const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return null;
    }

    return await getExpoPushToken();
  } else {
    // eslint-disable-next-line no-console
    console.log('Must use physical device for Push Notifications');
  }

  return null;
};

const useConfigNotification = () => {
  const { mutateAsync: registerExpoPushToken } =
    trpc.registerExpoPushToken.useMutation();

  return useMutation({
    mutationFn: async () => {
      const userId = await getUserId();

      if (!userId) {
        return;
      }

      const token = await registerForPushNotificationsAsync();

      if (token) {
        // Submit the notification token to the server
        await registerExpoPushToken({
          token,
          userId,
        });
      }
    },
  });
};

export default useConfigNotification;
