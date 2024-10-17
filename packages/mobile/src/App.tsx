import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withState } from './store';
import * as Linking from 'expo-linking';
import { Navigate, Route, Routes, useLocation } from './react-router';
import Home from './components/Home';
import Scanned from './components/Scanned';
import Chat from './components/Chat';
import Scanner from './components/Scanner';
import Checkin from './components/Checkin';
import Keys from './components/About/Keys';
import Key from './components/About/Keys/Key';
import Notices from './components/About/Notices';
import Licenses from './components/About/Licenses';
import ExpoPushToken from './components/About/ExpoPushToken';
import About from './components/About';
import Questionnaire from './components/Questionnaire';
import QuestionnaireCompleted from './components/Questionnaire/QuestionnaireCompleted';
import RiskProfile from './components/Questionnaire/RiskProfile';
import Exposure from './components/Exposure';
import Venues from './components/Venues';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';
import Notification from './components/Notification';
import Immunity from './components/Immunity';
import QR from './components/Immunity/QR';
import Setup from './components/Immunity/Setup';
import { connect, registerNotificationToken } from './actions';
import { useFonts } from 'expo-font';
import { styles } from './styles';
import { AppState, View, Image, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router';
import { initLocalize } from './services/i18n/localized';
import i18n from './services/i18n';
import { registerForPushNotificationsAsync, createPushNotifEncryptionKey, decryptPushNotification } from './services/notifications/notifications';
import * as Notifications from 'expo-notifications';
import LogoWhite from './assets/logo-white.png';

/**
 * Top level React Component for the application
 */

const App = withState()(
    (s) => ({
        localKey: s.system.localKey,
        isConnected: s.system.isConnected,
        connectionError: s.system.connectionError
    }),
    ({ dispatch, localKey, isConnected, connectionError }) => {

        initLocalize();
        const naviguate = useNavigate();
        const location = useLocation();
        const [userDigest, setUserDigest] = useState<string>(undefined);
        const [initialUrl, setInitialUrl] = useState<string>(undefined);
        const [pastInitialUrl, setPastInitialUrl] = useState<string>(undefined);
        const [isConnecting, setIsConnecting] = useState(false);
        const [hasConnected, setHasConnected] = useState(false);
        const [hasRequestedInitialURL, setHasRequestedInitialURL] = useState(false);
        const [hasParsedInitialURL, setHasParsedInitialURL] = useState(false);
        const [hasPluggedStateChange, setHasPluggedStateChange] = useState(false);
        const [expoToken, setExpoPushToken] = useState('');
        const [notification, setNotification] = useState<Notifications.Notification>();
        const [notificationMessage, setNotificationMessage] = useState<string>();
        const notificationListener = useRef<Notifications.Subscription>(null);
        const responseListener = useRef<Notifications.Subscription>(null);

        /**
         * Handles loading of the fonts used throughout the application
         */
        const [fontsLoaded] = useFonts({
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
        });

        /**
         * Handles Expo notifications
         */
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: location.pathname !== '/chat',
                shouldPlaySound: false,
                shouldSetBadge: false
            })
        });

        useEffect(() => {
            const encryptionKey = createPushNotifEncryptionKey();
            registerForPushNotificationsAsync().then(token => {
                setExpoPushToken(token);
                dispatch(registerNotificationToken(token, encryptionKey, i18n.locale));
            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                const encryptedMessage = response.notification.request.content.data.encrypted;
                decryptPushNotification(encryptionKey, encryptedMessage as string)
                    .then((decryptedMessage) => setNotificationMessage(decryptedMessage));
            });
        }, []);

        useEffect(() => {
            if (notificationMessage) {
                naviguate(`/notification/${notificationMessage}`);
            }
        }, [notificationMessage, naviguate]);

        /**
         * Application can be opened based on a QR code scan
         * This function parses a URL that triggers the application to open
         */
        const parseUrl = useCallback((url: string | null | undefined) => {
            const comps = url ? url.split('/').slice(-2) : undefined;
            if (comps?.length === 2 && comps[0] === 'check')
                setInitialUrl(comps[1]);
            else if (comps?.length === 2 && comps[0] === 'certificate') {
                naviguate(`/immunity/${comps[1]}`);
                setUserDigest(comps[1]);
            } else
                setInitialUrl(null);
        }, []);

        useEffect(() => {
            if (!initialUrl && !hasRequestedInitialURL && !userDigest) {
                setHasRequestedInitialURL(true);
                Linking.getInitialURL().then((url) => {
                    setHasParsedInitialURL(true);
                    parseUrl(url);
                }).catch((error) => {
                    setHasParsedInitialURL(true);
                    console.error('URL Parsing', error);
                });
                Linking.addEventListener('url', ({ url }) => {
                    parseUrl(url);
                });
            }
        }, [hasParsedInitialURL, hasRequestedInitialURL, initialUrl, userDigest, parseUrl]);

        useEffect(() => {
            if ((initialUrl !== pastInitialUrl && pastInitialUrl && initialUrl) || initialUrl) {
                naviguate(`/checkin/${initialUrl}`);
                setPastInitialUrl(initialUrl);
            }
        }, [initialUrl, naviguate, pastInitialUrl]);

        useEffect(() => {
            async function connectBackend() {
                dispatch(connect(localKey))
                    .then(() => {
                        setHasConnected(true);
                        setIsConnecting(false);
                    });
            }
            if (!hasConnected && !isConnecting && localKey) {
                setIsConnecting(true);
                connectBackend();
            }
        }, [dispatch, localKey, isConnecting, hasConnected, isConnected]);

        const handleAppStateChange = useCallback((nextAppState: string) => {
            if (nextAppState === 'active') {
                setHasRequestedInitialURL(false);
                if (!initialUrl && window.location.pathname.slice(0, 8) === '/scanner') {
                    naviguate('/');
                }
            }
        }, [initialUrl, naviguate]);

        /**
         * Function to reconnect to the Secretarium backend
         */
        const reconnect = () => {
            dispatch(connect(localKey));
        };

        useEffect(() => {
            if (!hasPluggedStateChange) {
                AppState.addEventListener('change', handleAppStateChange);
                setHasPluggedStateChange(true);
            }
        }, [handleAppStateChange, hasPluggedStateChange]);

        /**
         * Render a splash screen if assets are not loaded, or application fails to connect to the backend
         */
        if (!fontsLoaded || !hasParsedInitialURL || !isConnected)
            return <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Image source={LogoWhite} resizeMode={'contain'} style={{ width: '40%', bottom: 20 }} />
                {connectionError
                    ? <>
                        <Text style={[styles.text, { width: '80%' }]}>{connectionError}</Text>
                        <TouchableOpacity onPress={reconnect} style={[styles.button]}>
                            <Text style={[styles.text, { top: 0 }]}>Try again</Text>
                        </TouchableOpacity>
                    </>
                    : <>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={[styles.text]}>Connecting to Moai...</Text>
                    </>}
            </View>;

        return (
            <>
                <Routes>
                    <Route path="/push" element={<ExpoPushToken />} />
                    <Route path="/notices" element={<Notices />} />
                    <Route path="/keys" element={<Keys />} />
                    <Route path="/key/:key" element={<Key />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/licenses" element={<Licenses />} />
                    <Route path="/onboarding" element={<OnboardingScreen />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/scanner" element={<Scanner />} />
                    <Route path="/checkin/:venue/:source?/:type?" element={<Checkin />} />
                    <Route path="/scanned" element={<Scanned />} />
                    <Route path="/venues" element={<Venues />} />
                    <Route path="/feedback/form/:venueType?" element={<Questionnaire />} />
                    <Route path="/feedback/exposure/form/:feedbackToken/:testId" element={<Questionnaire />} />
                    <Route path="/feedback/completed" element={<QuestionnaireCompleted />} />
                    <Route path="/feedback/exposure" element={<Exposure />} />
                    <Route path="/feedback/riskProfile" element={<RiskProfile />} />
                    <Route path="/notification/:notificationMessage" element={<Notification />} />
                    <Route path="/immunity/:userDigest?" element={<Immunity />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/qrcode/:type" element={<QR />} />
                    <Route element={<Navigate to="/home" />} />
                </Routes>
            </>
        );
    }
);

export default App;
