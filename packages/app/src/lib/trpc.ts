import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
} from '@trpc/react-query';
import type { AppRouter } from '@boilerplate/api';
import { AUTH_TOKEN_KEY } from './secureStorageKeys';
import * as SecureStore from 'expo-secure-store';

export const trpc = createTRPCReact<AppRouter>();

const EXPO_PUBLIC_RPC_URL =
  process.env.EXPO_PUBLIC_RPC_URL || 'http://localhost:3000';

export const getRpcLinks = () => {
  return [
    httpBatchLink({
      url: EXPO_PUBLIC_RPC_URL as string,
      async headers() {
        if (!EXPO_PUBLIC_RPC_URL) {
          throw new Error('Missing EXPO_PUBLIC_RPC_URL');
        }

        const authToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

        if (authToken) {
          return {
            authorization: `Bearer ${authToken}`,
          };
        }

        return {};
      },
    }),
  ];
};

export const getRpcClient = () => {
  return createTRPCClient<AppRouter>({
    links: getRpcLinks(),
  });
};
