import 'dotenv/config';
import './lib/sentry';
import { router, createCallerFactory, publicProcedure } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext } from './context';
import {
  registerExpoPushTokenRequestBodyType,
  updateNotificationEnabledRequestBodyType,
  registerUserRequestBodyType,
  getUserRequestBodyType,
} from './rpcTypes';
import registerExpoPushToken from './api/registerExpoPushToken';
import updateNotificationEnabled from './api/updateNotificationEnabled';
import registerUser from './api/registerUser';
import getUser from './api/getUser';

// This is a workaround for the fact that BigInts are not supported by JSON.stringify
// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const appRouter = router({
  registerExpoPushToken: publicProcedure
    .input(registerExpoPushTokenRequestBodyType)
    .mutation(async ({ input }) => {
      return await registerExpoPushToken({
        ...input,
      });
    }),

  registerUser: publicProcedure
    .input(registerUserRequestBodyType)
    .mutation(async ({ input }) => {
      return await registerUser({
        ...input,
      });
    }),

  updateNotificationEnabled: publicProcedure
    .input(updateNotificationEnabledRequestBodyType)
    .mutation(async ({ input }) => {
      return await updateNotificationEnabled({
        ...input,
      });
    }),

  getUser: publicProcedure
    .input(getUserRequestBodyType)
    .query(async ({ input }) => {
      return await getUser(input.userId);
    }),
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3000');
});

export * from './rpcTypes';
