module.exports = {
  browser: false,
  moduleFileExtensions: ['js', 'ts'],
  roots: ['<rootDir>/src'],
  testRegex: '/__tests__/[^.]+-test.ts$',
  transform: {
    '\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  watchman: false
};
