const { pathsToModuleNameMapper } = require('ts-jest/utils')
const baseConfig = require('../../jest.config')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    moduleNameMapper: {
      ...pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|src/types|src/tests|src/scripts)[/\\\\]', 'api.ts', '.d.ts', 'index.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
}
