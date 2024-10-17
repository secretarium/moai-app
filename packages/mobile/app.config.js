const VERSION = '0.1.2';
const BUILD_NUMBER = 52;

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ config }) => ({

    ...config,

    version: VERSION,
    slug: 'moai-app-research',
    scheme: 'moai-app-research',
    owner: 'secretarium',
    icon: './assets/icon.png',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#eb7473'
    },
    ios: {
        buildNumber: `${BUILD_NUMBER}`,
        icon: './assets/ios/icon.png',
        supportsTablet: true,
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
        versionCode: BUILD_NUMBER,
        icon: './assets/android/icon.png',
        adaptiveIcon: {
            foregroundImage: './assets/android/adaptive-icon.png',
            backgroundColor: '#ffffff'
        },
        googleServicesFile: './google-services.json',
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
        favicon: './assets/favicon.png'
    },
    plugins: [
        [
            'expo-build-properties',
            {
                ios: {
                    newArchEnabled: true,
                    deploymentTarget: '13.4'
                },
                android: {
                    newArchEnabled: true,
                    minSdkVersion: 34,
                    compileSdkVersion: 34,
                    targetSdkVersion: 34,
                    buildToolsVersion: '34.0.0'
                }
            }
        ]
    ],
    experiments: {
        reactCanary: true,
        reactCompiler: true
    },
    extra: {
        eas: {
            projectId: 'afb1e9b5-c7c4-4775-95f2-806250b3eb8f'
        }
    }
});