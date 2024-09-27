// webpack.config.js or config-overrides.js (if using react-app-rewired)
module.exports = {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser')
      }
    }
  };
  