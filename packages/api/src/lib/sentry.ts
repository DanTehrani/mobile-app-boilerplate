// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from '@sentry/node';

if (process.env.RENDER === 'true') {
  // Only initialize Sentry on Render
  Sentry.init({
    dsn: 'xxx',
  });
}

export default Sentry;
