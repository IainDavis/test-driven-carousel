// jest.config.js
module.exports = {
  setupTestFrameworkScriptFile: './src/tests/jestSetup.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
