// eslint-disable-next-line no-undef
module.exports = {
  projects: [
    {
      displayName: "Unit Tests",
      testEnvironment: "jsdom",
      testMatch: ["**/src/tests/*.spec.ts"],
      transform: {
        "^.+\\.tsx?$": "ts-jest"
      },
    },
    {
      displayName: "Integration Tests",
      testEnvironment: "node",
      testMatch: ["**/src/tests/*.test.ts"],
      transform: {
        "^.+\\.tsx?$": "ts-jest"
      },
      setupFilesAfterEnv: ["<rootDir>/jest-integration-config.js"]
    },
  ],
};
