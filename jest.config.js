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
  ],
};
