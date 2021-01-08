import React, { useEffect, useState, useCallback } from 'react';
import { withState } from './store';
import * as Linking from 'expo-linking';
import { Redirect, Route, Switch } from './ReactRouter';
import { useColorScheme } from 'react-native-appearance';
import Modal from 'react-native-modal';
import About from './About';
import Home from './components/Home';
import Scanned from './components/Scanned';
import Chat from './components/Chat';
import Scanner from './components/Scanner';
import Checkin from './components/Checkin';
import Keys from './components/Infos/Keys';
import Notices from './components/Infos/Notices';
import Licenses from './components/Infos/Licenses';
import Infos from './components/Infos';
import Questionnaire from './components/Questionnaire';
import Venues from './components/Venues';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from './components/commonStyles';
import { generateLocalKey, connect } from './actions';
import { useFonts } from 'expo-font';
import { styles } from './styles';
import { AppState, View, Image, Button, Text } from 'react-native';
import { useHistory } from 'react-router';


const App = withState()(
    (s) => ({
        localKey: s.system.localKey,
        isConnected: s.system.isConnected,
        connectionError: s.system.connectionError
    }),
    ({ dispatch, localKey, isConnected, connectionError }) => {

        const history = useHistory();
        const [initialUrl, setInitialUrl] = useState<string>(undefined);
        const [pastInitialUrl, setPastInitialUrl] = useState<string>(undefined);
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [showModal, setShowModal] = useState<boolean>(false);
        const [isConnecting, setIsConnecting] = useState(false);
        const [hasConnected, setHasConnected] = useState(false);
        const [hasRequestedInitialURL, setHasRequestedInitialURL] = useState(false);
        const [hasParsedInitialURL, setHasParsedInitialURL] = useState(false);
        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasObtainedLocalKey, setHasObtainedLocalKey] = useState(false);
        const [hasPluggedStateChange, setHasPluggedStateChange] = useState(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeModalStyle = colorScheme !== 'dark' ? 'black' : 'white';
        const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';

        const [fontsLoaded] = useFonts({
            'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
            'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
        });

        const parseUrl = useCallback((url: string | null | undefined) => {

            const comps = url ? url.split('/').slice(-2) : undefined;
            if (comps?.length === 2 && comps[0] === 'check')
                setInitialUrl(comps[1]);
            else
                setInitialUrl(null);
        }, []);

        useEffect(() => {
            if (connectionError && errorMessage !== connectionError) {
                setErrorMessage(connectionError);
                setShowModal(true);
            }
        }, [errorMessage, connectionError]);

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
                <Modal isVisible={showModal}>
                    <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                        <MaterialIcons name='error' size={84} color={themeModalStyle} />
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                            {errorMessage}
                        </Text>
                        <Button title='Close' onPress={() => setShowModal(false)} />
                    </View>
                </Modal>
                <Image source={require('../assets/splash.png')} style={styles.backgroundImage} />
            </View>;

        return (
            <>
                <Switch>
                    <Route path="/notices" component={Notices} />
                    <Route path="/keys" component={Keys} />
                    <Route path="/infos" component={Infos} />
                    <Route path="/licenses" component={Licenses} />
                    <Route path="/onboarding" component={OnboardingScreen} />
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/scanner" component={Scanner} />
                    <Route path="/checkin/:venue/:source?/:type?" component={Checkin} />
                    <Route path="/scanned" component={Scanned} />
                    <Route path="/venues" component={Venues} />
                    <Route path="/questionnaire" component={Questionnaire} />
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
