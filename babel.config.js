module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel", 
      'react-native-paper/babel', 
      ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": false,
      "verbose": false
      }
      ],
      'react-native-reanimated/plugin',
    ],
  };
};