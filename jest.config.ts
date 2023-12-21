export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
  },
  modulePathIgnorePatterns: [
    "<rootDir>/src/__test__/App.test.tsx",
    "<rootDir>/src/__test__/Game.test.tsx",
  ],
};
