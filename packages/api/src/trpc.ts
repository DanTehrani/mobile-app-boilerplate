import * as Sentry from '@sentry/node';
import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;

    // eslint-disable-next-line no-console
    console.error(`${error.message}`, {
      shape,
      path: opts.path,
    });
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause?.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;

const sentryMiddleware = t.middleware(
  Sentry.trpcMiddleware({
    attachRpcInput: true,
  })
);

const responseTimeMiddleware = t.middleware(async ({ path, type, next }) => {
  const startTime = performance.now();
  const result = await next();
  const endTime = performance.now();

  const duration = (endTime - startTime).toFixed(2);

  // eslint-disable-next-line no-console
  console.log(`[tRPC] ${type.toUpperCase()} "${path}" took ${duration}ms`, {
    path,
    type,
    duration,
  });

  return result;
});

const sentrifiedProcedure = t.procedure
  .use(sentryMiddleware)
  .use(responseTimeMiddleware);

export const publicProcedure = sentrifiedProcedure;

export const authedProcedure = sentrifiedProcedure.use(async opts => {
  const { userId } = opts.ctx;

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      userId,
    },
  });
});
