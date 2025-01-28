// eslint-disable-next-line no-undef
module.exports = {
  projects: [
    {
      displayName: "Unit Tests",
      testEnvironment: "jsdom",
      testMatch: ["**/*.spec.ts"],
      transform: {
        "^.+\\.tsx?$": "ts-jest"
      },
    },
    {
      displayName: "Integration Tests",
      testEnvironment: "node",
      testMatch: ["**/*.test.ts"],
      transform: {
        "^.+\\.tsx?$": "ts-jest"
      },
      setupFilesAfterEnv: ["<rootDir>/jest-integration-config.js"]
    },
  ],
};
