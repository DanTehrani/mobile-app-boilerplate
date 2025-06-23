import AsyncStorage from '@react-native-async-storage/async-storage';
import queryKeys from '@/queryKeys/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useSetAsyncStorageValue = <T>(key: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: T) => {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.asyncStorageValue(key),
      });
    },
  });
};

export default useSetAsyncStorageValue;
