module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  globals: {
    'ts-jest': {
      tsConfig: {
        types: ['jest', 'node'],
        esModuleInterop: true,
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@growth-hacking/core$': '<rootDir>/packages/core/src',
    '^@growth-hacking/puppeteer$': '<rootDir>/packages/puppeteer/src',
  },
  modulePathIgnorePatterns: ['<rootDir>/aws', '<rootDir>/modules/*/lib'],
  testRegex: '((\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
