import winston from 'winston';

const DATADOG_API_KEY = process.env.DATADOG_API_KEY;

const SERVICE_NAME = process.env.RENDER_SERVICE_NAME || 'no-service-name';

const httpTransportOptions = {
  host: 'http-intake.logs.ap1.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${DATADOG_API_KEY}&ddsource=nodejs&service=${SERVICE_NAME}`,
  ssl: true,
};

const useDatadog = !!DATADOG_API_KEY;

if (useDatadog) {
  // eslint-disable-next-line no-console
  console.log('Sending logs to Datadog');
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: useDatadog
    ? winston.format.json()
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
  exitOnError: false,
  transports: useDatadog
    ? [
        new winston.transports.Http(httpTransportOptions),
        new winston.transports.Console(),
      ]
    : [new winston.transports.Console()],
});
