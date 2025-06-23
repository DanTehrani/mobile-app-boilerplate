import { getUserId } from '@/lib/utils';
import * as Device from 'expo-device';
import { useEffect } from 'react';
import { useState } from 'react';

const DEV_USER_ID = 'c430b69b-dedc-478f-a2b4-36a81ebf4850';

const useUserId = () => {
  const [userId, setUserId] = useState<string | undefined | null>(undefined);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!Device.isDevice) {
        setUserId(DEV_USER_ID);
        return;
      }

      const userId = await getUserId();
      setUserId(userId);
    };
    fetchUserId();
  }, []);

  return { data: userId };
};

export default useUserId;
