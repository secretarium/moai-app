module.exports = {
    preset: 'jest-expo/universal',
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-router-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
    ],
    collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}']
};