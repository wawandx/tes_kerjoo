module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-rewrite-require',
      {
        aliases: {
          crypto: 'crypto-browserify',
        },
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@easypeasy': './app/easypeasy',
          '@commons': './app/commons',
          '@configs': './app/configs',
          '@screens': './app/screens',
          '@helper': './app/helper',
          '@storage': './app/storage',
          '@navigations': './app/navigations',
        },
      },
    ],
  ],
};
