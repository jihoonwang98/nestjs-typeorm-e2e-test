module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
