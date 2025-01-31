globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.json',
};

module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        stringifyContentPathRegex: '\\.html$',
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!flat)/'],
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts', '!<rootDir>/src/main.ts', '!<rootDir>/src/environments/**', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  fakeTimers: {
    enableGlobally: true,
  },
};
