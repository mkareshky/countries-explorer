module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use Babel to transform TypeScript and JavaScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Allow Jest to transform `axios` or any other ESM packages
  ],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  testEnvironment: 'jsdom', // Use jsdom for browser-like environment
};
