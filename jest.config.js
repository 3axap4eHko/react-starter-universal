module.exports = {
  verbose: true,
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js"
  },
  "unmockedModulePathPatterns": [
    "node_modules/react/",
    "node_modules/enzyme/"
  ],
  "setupFiles": [
    "raf/polyfill"
  ]
};