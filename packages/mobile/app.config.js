const config = {
    name: 'Moai',
    description: 'A research app developed by Secretarium',
    version: '0.0.47',
    slug: 'moai-app-research',
    scheme: 'moai-app-research',
    icon: './assets/icon.png',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#eb7473'
    },
    userInterfaceStyle: 'automatic',
    orientation: 'portrait',
    ios: {
        buildNumber: '47',
        icon: './assets/ios/icon.png',
        bundleIdentifier: 'com.secretarium.moai.research',
        associatedDomains: [
            'applinks:moaiapp.com',
            'applinks:moai-app.com'
        ],
        infoPlist: {
            NSCameraUsageDescription: 'This app uses the camera to check into venues (e.g. bars, restaurants, shops, music venues, sports arenas) by scanning QR code posters at the entrances.'
        }
    },
    android: {
        versionCode: 47,
        icon: './assets/android/icon.png',
        package: 'com.secretarium.moai.research',
        useNextNotificationsApi: true,
        permissions: [
            'CAMERA'
        ],
        intentFilters: [
            {
                autoVerify: true,
                action: 'VIEW',
                data: [
                    {
                        scheme: 'https',
                        host: '*.moaiapp.com',
                        pathPrefix: '/check'
                    },
                    {
                        scheme: 'https',
                        host: '*.moaiapp.com',
                        pathPrefix: '/immunity/certificate'
                    },
                    {
                        scheme: 'https',
                        host: '*.moai-app.com',
                        pathPrefix: '/check'
                    },
                    {
                        scheme: 'https',
                        host: '*.moai-app.com',
                        pathPrefix: '/immunity/certificate'
                    },
                    {
                        scheme: 'moai-app-research'
                    }
                ],
                category: [
                    'BROWSABLE',
                    'DEFAULT'
                ]
            }
        ]
    },
    web: {
        favicon: './assets/android/icon.png'
    },
    assetBundlePatterns: [
        '**/*'
    ],
    packagerOpts: {
        config: 'metro.config.js',
        sourceExts: [
            'native.tsx',
            'native.jsx',
            'native.ts',
            'native.js',
            'android.tsx',
            'android.jsx',
            'android.ts',
            'android.js',
            'ios.tsx',
            'ios.jsx',
            'ios.ts',
            'ios.js',
            'jsx',
            'js',
            'json',
            'ts',
            'tsx',
            'txt'
        ]
    },
    experiments: {
        turboModules: true
    }
};

module.exports = config;