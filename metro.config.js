/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  server: {
    rewriteRequestUrl: url => {
      if (!url.endsWith('.bundle')) {
        return url;
      }
      return (
        url +
        '?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true'
      );
    },
  },
};
