const config = require('./jest.config');
config.testMatch = ['<rootDir>/tests/integration/**/*.test.ts'];
module.exports = config;
