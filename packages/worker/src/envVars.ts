import 'dotenv/config';

const getEnvVar = <T>(key: string): T => {
  // eslint-disable-next-line security/detect-object-injection
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not set`);
  }

  return value as T;
};

export const EXPO_ACCESS_TOKEN = getEnvVar<string>('EXPO_ACCESS_TOKEN');
