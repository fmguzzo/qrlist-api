module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testEnvironment: "node",
  //verbose: true,
  //forceExit: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "src/.*\\.test\\.ts$",
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
