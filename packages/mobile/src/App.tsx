import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withState } from './store';
import * as Linking from 'expo-linking';
import { Redirect, Route, Switch, useLocation } from './ReactRouter';
import Home from './components/Home';
import Scanned from './components/Scanned';
import Chat from './components/Chat';
import Scanner from './components/Scanner';
import Checkin from './components/Checkin';
import Keys from './components/Infos/Keys';
import Key from './components/Infos/Keys/Key';
import Notices from './components/Infos/Notices';
import Licenses from './components/Infos/Licenses';
import ExpoPushToken from './components/Infos/ExpoPushToken';
import Infos from './components/Infos';
import Questionnaire from './components/Questionnaire';
import QuestionnaireCompleted from './components/Questionnaire/QuestionnaireCompleted';
import Venues from './components/Venues';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';
import Notification from './components/Notification';
import { connect, registerNotificationToken } from './actions';
import { useFonts } from 'expo-font';
import { styles } from './styles';
import { AppState, View, Image, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router';
import { initLocalize } from './services/i18n/localized';
import i18n from 'i18n-js';
import { registerForPushNotificationsAsync, createPushNotifEncryptionKey, decryptPushNotification } from './services/notifications/notifications';
import * as Notifications from 'expo-notifications';


const App = withState()(
    (s) => ({
        localKey: s.system.localKey,
        isConnected: s.system.isConnected,
        connectionError: s.system.connectionError
    }),
    ({ dispatch, localKey, isConnected, connectionError }) => {

        initLocalize();
        const history = useHistory();
        const location = useLocation();
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
        const notificationListener = useRef<any>();
        const responseListener = useRef<any>();

        const [fontsLoaded] = useFonts({
            'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
            'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
        });

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
                history.push(`/notification/${notificationMessage}`);
            }
        }, [notificationMessage, history]);

        const parseUrl = useCallback((url: string | null | undefined) => {
            const comps = url ? url.split('/').slice(-2) : undefined;
            if (comps?.length === 2 && comps[0] === 'check')
                setInitialUrl(comps[1]);
            else
                setInitialUrl(null);
        }, []);

        useEffect(() => {
            if (!initialUrl && !hasRequestedInitialURL) {
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
        }, [hasParsedInitialURL, hasRequestedInitialURL, initialUrl, parseUrl]);

        useEffect(() => {
            if ((initialUrl !== pastInitialUrl && pastInitialUrl && initialUrl) || initialUrl) {
                history.push(`/checkin/${initialUrl}`);
                setPastInitialUrl(initialUrl);
            }
        }, [initialUrl, history, pastInitialUrl]);

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
                if (!initialUrl && history.location.pathname.slice(0, 8) === '/scanner') {
                    history.push('/');
                }
            }
        }, [history, initialUrl]);

        const reconnect = () => {
            dispatch(connect(localKey));
        };

        useEffect(() => {
            if (!hasPluggedStateChange) {
                AppState.addEventListener('change', handleAppStateChange);
                setHasPluggedStateChange(true);
            }
        }, [handleAppStateChange, hasPluggedStateChange]);

        if (!fontsLoaded || !hasParsedInitialURL || !isConnected)
            return <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Image source={require('./assets/logo-white.png')} resizeMode={'contain'} style={{ width: '40%', bottom: 20 }} />
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
                <Switch>
                    <Route path={`/${i18n.t('APP_INFOS')[3]}`} component={ExpoPushToken} />
                    <Route path={`/${i18n.t('APP_INFOS')[2]}`} component={Notices} />
                    <Route path={`/${i18n.t('APP_INFOS')[1]}`} component={Keys} />
                    <Route path="/key/:key" component={Key} />
                    <Route path="/infos" component={Infos} />
                    <Route path={`/${i18n.t('APP_INFOS')[0]}`} component={Licenses} />
                    <Route path="/onboarding" component={OnboardingScreen} />
                    <Route path="/home" component={Home} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/scanner" component={Scanner} />
                    <Route path="/checkin/:venue/:source?/:type?" component={Checkin} />
                    <Route path="/scanned" component={Scanned} />
                    <Route path="/venues" component={Venues} />
                    <Route path="/feedback/form" component={Questionnaire} />
                    <Route path="/feedback/completed" component={QuestionnaireCompleted} />
                    <Route path="/notification/:notificationMessage" component={Notification} />
                    <Route render={() => {
                        // if (showOnboarding)
                        //     return <Redirect to="/onboarding" />;
                        return <Redirect to="/home" />;
                    }} />
                </Switch>
            </>
        );
    }
);

export default App;
