import * as Updates from 'expo-updates';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { UPDATE_AVAILABLE_KEY } from '../lib/asyncStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAutoUpdate = () => {
  const [isUpdating, setIsUpdating] = useState<boolean | null>(null);

  // Hook to reload the app when an update is available on first mount
  useEffect(() => {
    (async () => {
      if (Device.isDevice && !__DEV__) {
        // Get the update available status from AsyncStorage
        const isAvailable = await AsyncStorage.getItem(UPDATE_AVAILABLE_KEY);

        if (isAvailable === 'true') {
          setIsUpdating(true);

          // Set the update available status in AsyncStorage to false
          // We don't use `useSetAsyncStorageValue` here because this hook is
          // called outside of the query client context
          await AsyncStorage.setItem(UPDATE_AVAILABLE_KEY, 'false');

          // Reload the app to apply the update
          await Updates.reloadAsync();
        }

        setIsUpdating(false);
      } else {
        setIsUpdating(false);
      }
    })();
  }, []);

  return {
    isUpdating,
  };
};

export default useAutoUpdate;
