module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest'
	},
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
	testMatch: ['<rootDir>/src/tests/**/*.test.{js,jsx}', '<rootDir>/src/**/?(*.)+(spec|test).{js,jsx}'],
	setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': '<rootDir>/src/tests/styleMock.js'
	}
};
