import { logger } from './logger';

/**
 * Sleeps for a specified number of milliseconds
 */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const safeLoop = async ({
  fn,
  interval,
}: {
  fn: () => Promise<void>;
  interval: number;
}) => {
  while (true) {
    try {
      await fn();
    } catch (error) {
      logger.error(error);
    }
    await sleep(interval);
  }
};
