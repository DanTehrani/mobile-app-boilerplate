import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { JWT_SECRET } from './lib/envVars';
import jwt from 'jsonwebtoken';

export async function createContext(opts: CreateNextContextOptions) {
  const token = opts.req.headers['authorization']?.split(' ')[1];

  const decoded: any = token ? jwt.verify(token, JWT_SECRET) : null;

  const userId = decoded?.userId;

  return {
    userId,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
