import * as Updates from 'expo-updates';
import * as Device from 'expo-device';
import { useEffect } from 'react';
import { UPDATE_AVAILABLE_KEY } from '@/lib/asyncStorageKeys';
import useSetAsyncStorageValue from './useSetAsyncStorageValue';

const useFetchUpdates = () => {
  const { mutateAsync: setUpdateAvailable } =
    useSetAsyncStorageValue(UPDATE_AVAILABLE_KEY);

  // Check for updates on first mount
  // Download the update if it is available
  // Check for updates every 5 seconds
  useEffect(() => {
    const checkForUpdates = async () => {
      if (Device.isDevice && !__DEV__) {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          // Fetch the update
          await Updates.fetchUpdateAsync();
        }

        // Set the update available status in AsyncStorage
        await setUpdateAvailable(isAvailable);
      } else {
        await setUpdateAvailable(false);
      }
    };

    // Check immediately on focus
    checkForUpdates();

    // Then check every 5 seconds
    const interval = setInterval(checkForUpdates, 5000);

    // Cleanup interval on blur
    return () => clearInterval(interval);
  }, []);
};

export default useFetchUpdates;
