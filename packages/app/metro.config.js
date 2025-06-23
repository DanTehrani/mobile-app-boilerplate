/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const defaultConfig = getSentryExpoConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..');

// 1. Watch all files within the monorepo
defaultConfig.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = defaultConfig;
