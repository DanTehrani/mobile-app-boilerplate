import * as SecureStore from 'expo-secure-store';
import queryKeys from '@/queryKeys/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useSetSecureStorageValue = <T>(key: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: T) => {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
      await queryClient.invalidateQueries({
        queryKey: queryKeys.secureStorageValue(key),
      });
    },
  });
};

export default useSetSecureStorageValue;
