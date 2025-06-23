import { AppRouter } from '@boilerplate/api';
import { inferRouterOutputs } from '@trpc/server';

export type GetUserResponseType = inferRouterOutputs<AppRouter>['getUser'];
