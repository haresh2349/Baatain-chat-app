import type { Config } from 'jest'

const config: Config = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Handle both TS and TSX files using babel-jest
    '^.+\\.(js|jsx)$': 'babel-jest', // Handle JS/JSX files as well
  },
  moduleNameMapper: {
    '^.+\\.(css|scss|sass|less)$': 'identity-obj-proxy', // Mock CSS imports
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)', // Look for test files
  ],
}

export default config
