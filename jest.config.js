const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/src/tests/'],
  setupFiles: ['<rootDir>/src/scripts/jest-setup.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: './src/tests/coverage',
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]'],
  modulePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
