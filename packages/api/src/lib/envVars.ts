import 'dotenv/config';

const getEnvVar = <T>(key: string): T => {
  // eslint-disable-next-line security/detect-object-injection
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value as T;
};

export const OPENAI_API_KEY = getEnvVar<string>('OPENAI_API_KEY');
export const JWT_SECRET = getEnvVar<string>('JWT_SECRET');
