module.exports = {

  globals: {
    'ts-jest': {
      tsConfig: "<rootDir/tsconfig.json>"
    }
  },
  projects: [
    {
      displayName: "Unit Tests",
      testEnvironment: "jsdom",
      testMatch: ["**/src/tests/*.spec.ts"],
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tsconfig.spec.json"
          }
        ]
      }
    },
    {
      displayName: "Integration Tests",
      testEnvironment: "node",
      testMatch: ["**/src/tests/*.test.ts"],
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            tsconfig: "<rootDir>/tsconfig.test.json"
          }
        ]
      },
      setupFilesAfterEnv: ["<rootDir>/jest-integration-config.js"],
    }
  ]
};
