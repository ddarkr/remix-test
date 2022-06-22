const { withEsbuildOverride } = require('remix-esbuild-override');
const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill').default;

withEsbuildOverride((option, { isServer }) => {
  if (isServer)
    option.plugins = [
      GlobalsPolyfills({
        buffer: true, // fix @emotion buffer error on cloudflare
      }),
      ...option.plugins,
    ];

  return option;
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server.js',
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: 'src/app',
  // assetsBuildDirectory: 'public/build',
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/",
};
