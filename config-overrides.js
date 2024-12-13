const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: require.resolve('browserify-fs'),
    path: require.resolve('path-browserify'),
    url: require.resolve('url/'),
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    'process/browser': require.resolve('process/browser'),
    vm: require.resolve('vm-browserify'),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    },
  ];

  return config;
};
