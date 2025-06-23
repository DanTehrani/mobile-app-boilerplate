import * as Notifications from 'expo-notifications';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/queryKeys/queryKeys';

const useNotificationPermission = () => {
  const queryResult = useQuery({
    queryKey: queryKeys.notificationPermission,
    queryFn: async () => {
      const status = await Notifications.getPermissionsAsync();
      return status;
    },
    refetchOnWindowFocus: true,
  });

  return queryResult;
};

export default useNotificationPermission;
