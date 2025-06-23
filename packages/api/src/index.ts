import 'dotenv/config';
import './lib/sentry';
import {
  router,
  createCallerFactory,
  publicProcedure,
  authedProcedure,
} from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { createContext } from './context';
import {
  registerExpoPushTokenRequestBodyType,
  updateNotificationEnabledRequestBodyType,
  registerUserRequestBodyType,
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
  registerExpoPushToken: authedProcedure
    .input(registerExpoPushTokenRequestBodyType)
    .mutation(async ({ ctx, input }) => {
      return await registerExpoPushToken({
        ...input,
        userId: ctx.userId,
      });
    }),

  registerUser: publicProcedure
    .input(registerUserRequestBodyType)
    .mutation(async ({ input }) => {
      return await registerUser({
        ...input,
      });
    }),

  updateNotificationEnabled: authedProcedure
    .input(updateNotificationEnabledRequestBodyType)
    .mutation(async ({ ctx, input }) => {
      return await updateNotificationEnabled({
        userId: ctx.userId,
        ...input,
      });
    }),

  getUser: authedProcedure.query(async ({ ctx }) => {
    return await getUser({ userId: ctx.userId });
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
