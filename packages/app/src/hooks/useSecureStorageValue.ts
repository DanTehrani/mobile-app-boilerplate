import * as SecureStore from 'expo-secure-store';
import queryKeys from '@/queryKeys/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useSecureStorageValue = <T extends string | boolean>(key: string) => {
  return useQuery({
    queryKey: queryKeys.secureStorageValue(key),
    queryFn: async (): Promise<T> => {
      const value = await SecureStore.getItemAsync(key);
      return value as unknown as T;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export default useSecureStorageValue;
