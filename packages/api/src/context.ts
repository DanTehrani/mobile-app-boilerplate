import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
export async function createContext(_opts: CreateNextContextOptions) {
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
