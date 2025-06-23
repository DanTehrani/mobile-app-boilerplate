import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@boilerplate/api';

const url = 'http://localhost:3000';

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
