import AsyncStorage from '@react-native-async-storage/async-storage';
import queryKeys from '@/queryKeys/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useAsyncStorageValue = <T extends string | boolean>(key: string) => {
  return useQuery({
    queryKey: queryKeys.asyncStorageValue(key),
    queryFn: async (): Promise<T> => {
      const value = await AsyncStorage.getItem(key);

      if (value === 'true' || value === 'false') {
        return value === 'true'
          ? (true as unknown as T)
          : (false as unknown as T);
      }

      if (value === null) {
        return null as unknown as T;
      }

      try {
        return JSON.parse(value) as unknown as T;
      } catch {
        return value as unknown as T;
      }
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export default useAsyncStorageValue;
