const config = {
    name: 'Moai',
    description: 'An app for Confidential Track and Trace',
    icon: './assets/icon.png',
    version: '0.0.1',
    slug: 'moai-confidential-test-and-trace',
    ios: {
        bundleIdentifier: 'com.secretarium.moai.app',
        associatedDomains: ['applinks:moaiapp.com']
    },
    android: {
        package: 'com.secretarium.moai.app',
        intentFilters: [
            {
                action: 'VIEW',
                data: [
                    {
                        scheme: 'https',
                        host: '*.moaiapp.com',
                        pathPrefix: '/check'
                    }
                ],
                category: [
                    'BROWSABLE',
                    'DEFAULT'
                ]
            }
        ]
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
            'tsx'
        ]
    },
    loading: {
        icon: './assets/logo.png',
        hideExponentText: false
    },
    splash: {
        image: './assets/logo.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
    }
};

module.exports = config;