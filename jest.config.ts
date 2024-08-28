import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Support for absolute imports
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files using ts-jest
    "^.+\\.(js|jsx)$": "babel-jest", // Transform JavaScript files using babel-jest
  },
};

export default config;
