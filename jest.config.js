module.exports = {
    preset: 'react-native',
    moduleNameMapper: {
        '@src/*': '<rootDir>/src/*',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
    transformIgnorePatterns: ['node_modules/?!(static-container)'],
    cacheDirectory: '.jest/cache',
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    clearMocks: true,
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
};