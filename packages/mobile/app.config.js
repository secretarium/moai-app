const config = {
    name: 'Moai',
    description: 'An app for Confidential Track and Trace',
    icon: 'https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/icon.png?raw=true',
    version: '0.0.1',
    slug: 'moai-confidential-test-and-trace',
    ios: {
        bundleIdentifier: 'com.secretarium.moai.app'
    },
    android: {
        package: 'com.secretarium.moai.app'
    },
    packagerOpts: {
        config: 'metro.config.js',
        sourceExts: [
            'native.tsx',
            'native.jsx',
            'native.ts',
            'native.js',
            'jsx',
            'js',
            'json',
            'ts',
            'tsx',
            'graphql',
            'gql',
            'svg'
        ]
    },
    splash: {
        image: 'https://github.com/expo/expo/blob/master/templates/expo-template-blank/assets/splash.png?raw=true',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
    }
};

module.exports = config;