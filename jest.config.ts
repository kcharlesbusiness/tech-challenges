export default {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/composables/**/*.vue',
    '<rootDir>/models/**/*.vue',
    '<rootDir>/services/**/*.vue',
    '<rootDir>/store/**/*.vue',
  ],
  roots: ['<rootDir>/'],
  preset: 'vite-jest',
  cli: 'vite-jest',
}