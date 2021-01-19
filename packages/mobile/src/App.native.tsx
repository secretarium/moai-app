import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withState } from './store';
import * as Linking from 'expo-linking';
import { Redirect, Route, Switch } from './ReactRouter';
import About from './About';
import Home from './components/Home';
import Scanned from './components/Scanned';
import Chat from './components/Chat';
import Scanner from './components/Scanner';
import Checkin from './components/Checkin';
import Keys from './components/Infos/Keys';
import Key from './components/Infos/Keys/Key';
import Notices from './components/Infos/Notices';
import Licenses from './components/Infos/Licenses';
import Infos from './components/Infos';
import Questionnaire from './components/Questionnaire';
import QuestionnaireCompleted from './components/Questionnaire/QuestionnaireCompleted';
import Venues from './components/Venues';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';
import { generateLocalKey, connect } from './actions';
import { useFonts } from 'expo-font';
import { styles } from './styles';
import { AppState, View, Image } from 'react-native';
import { useHistory } from 'react-router';
import { initLocalize } from './services/i18n/localized';
import i18n from 'i18n-js';
import { registerForPushNotificationsAsync } from './services/notifications/notifications';
import * as Notifications from 'expo-notifications';
import { actionTypes } from './actions/constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

const App = withState()(
    (s) => ({
        localKey: s.system.localKey,
        isConnected: s.system.isConnected
    }),
    ({ dispatch, localKey, isConnected }) => {

        initLocalize();
        const history = useHistory();
        const [initialUrl, setInitialUrl] = useState<string>(undefined);
        const [pastInitialUrl, setPastInitialUrl] = useState<string>(undefined);
        const [isConnecting, setIsConnecting] = useState(false);
        const [hasConnected, setHasConnected] = useState(false);
        const [hasRequestedInitialURL, setHasRequestedInitialURL] = useState(false);
        const [hasParsedInitialURL, setHasParsedInitialURL] = useState(false);
        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasObtainedLocalKey, setHasObtainedLocalKey] = useState(false);
        const [hasPluggedStateChange, setHasPluggedStateChange] = useState(false);
        const [expoPushToken, setExpoPushToken] = useState('');
        const [notification, setNotification] = useState<Notifications.Notification>();
        const notificationListener = useRef<any>();
        const responseListener = useRef<any>();

        const [fontsLoaded] = useFonts({
            'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
            'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
        });

        useEffect(() => {
            registerForPushNotificationsAsync().then(token => {
                setExpoPushToken(token);
                dispatch({ type: actionTypes.MOAI_SAVE_EXPO_PUSH_TOKEN, payload: token });
            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

        }, []);

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
            if (!localKey && !hasRequestedLocalKey) {
                setHasRequestedLocalKey(true);
                dispatch(generateLocalKey()).then(() => {
                    setHasObtainedLocalKey(true);
                });
            } else if (localKey) {
                setHasRequestedLocalKey(true);
                setHasObtainedLocalKey(true);
            }
        }, [dispatch, hasRequestedLocalKey, localKey]);

        useEffect(() => {
            async function connectBackend() {
                dispatch(connect(localKey))
                    .then(() => {
                        setHasConnected(true);
                        setIsConnecting(false);
                    });
            }
            if (!hasConnected && !isConnecting && hasObtainedLocalKey) {
                setIsConnecting(true);
                connectBackend();
            }
        }, [dispatch, localKey, hasConnected, isConnecting, hasObtainedLocalKey, isConnected]);

        const handleAppStateChange = useCallback((nextAppState: string) => {
            if (nextAppState === 'active') {
                setHasRequestedInitialURL(false);
                if (!initialUrl && history.location.pathname.slice(0, 8) === '/scanner') {
                    history.push('/');
                }
            }
        }, [history, initialUrl]);

        useEffect(() => {
            if (!hasPluggedStateChange) {
                AppState.addEventListener('change', handleAppStateChange);
                setHasPluggedStateChange(true);
            }
        }, [handleAppStateChange, hasPluggedStateChange]);

        if (!fontsLoaded || !hasObtainedLocalKey || !hasParsedInitialURL || !isConnected)
            return <View style={styles.container}>
                <Image source={require('../assets/splash.png')} style={styles.backgroundImage} />
            </View>;

        return (
            <>
                <Switch>
                    <Route path={`/${i18n.t('APP_INFOS')[2]}`} component={Notices} />
                    <Route path={`/${i18n.t('APP_INFOS')[1]}`} component={Keys} />
                    <Route path="/key/:key" component={Key} />
                    <Route path="/infos" component={Infos} />
                    <Route path={`/${i18n.t('APP_INFOS')[0]}`} component={Licenses} />
                    <Route path="/onboarding" component={OnboardingScreen} />
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/scanner" component={Scanner} />
                    <Route path="/checkin/:venue/:source?/:type?" component={Checkin} />
                    <Route path="/scanned" component={Scanned} />
                    <Route path="/venues" component={Venues} />
                    <Route path="/questionnaire/:venueType" component={Questionnaire} />
                    <Route path="/questionnaireCompleted" component={QuestionnaireCompleted} />
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
