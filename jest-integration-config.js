export const displayName = "Integration Tests";
export const testEnvironment = "node";
export const testMatch = ["**/src/tests/*.test.ts"];
export const transform = {
  "^.+\\.tsx?$": "ts-jest"
};
export const testTimeout = 10000;
