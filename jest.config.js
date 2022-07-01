

const config = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  verbose: true,
  testEnvironment: "jsdom",
};

module.exports = config;
