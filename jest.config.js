module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/__tests__/setupEnv.js'],
  globalSetup: '<rootDir>/src/__tests__/globalSetup.js',
  globalTeardown: '<rootDir>/src/__tests__/globalTeardown.js',
  testPathIgnorePatterns: ['/node_modules/', '/.stryker-tmp/', '/src/__tests__/helpers/', '/src/__tests__/globalSetup.js', '/src/__tests__/globalTeardown.js', '/src/__tests__/setupEnv.js'],
  testTimeout: 15000,
  coveragePathIgnorePatterns: ['/node_modules/', '/src/__tests__/'],
};
