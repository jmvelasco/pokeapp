

const config = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/utils/strings.js'],
  verbose: true,
  testEnvironment: "jsdom",
};

module.exports = config;
