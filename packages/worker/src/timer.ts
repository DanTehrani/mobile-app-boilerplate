import chalk from 'chalk';
import { logger } from './logger';

export interface Timer {
  startTime: number;
  label: string;
}

/**
 * Start a timer
 * @param label - The label of the timer
 * @returns The timer object
 */
export const st = (label: string): Timer => {
  return {
    startTime: Date.now(),
    label,
  };
};

/**
 * End a timer
 * @param timer - The timer object
 */
export const ed = (timer: Timer) => {
  const endTime = Date.now();
  const duration = endTime - timer.startTime;

  const durationInSeconds = duration / 1000;

  const message = `timer: ${durationInSeconds}s ${timer.label}`;

  logger.info(chalk.cyan(message), {
    duration: durationInSeconds,
    label: timer.label,
  });
};
