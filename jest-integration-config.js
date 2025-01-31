/* eslint-disable no-undef */
module.exports = {
  displayName: 'Integration Tests',
  testEnvironment: 'node',
  testMatch: ['**/src/tests/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testTimeout: 10000,
};
