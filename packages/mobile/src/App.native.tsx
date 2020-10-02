import React, { useEffect, useState, useCallback } from 'react';
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
import Notices from './components/Infos/Notices';
import Licenses from './components/Infos/Licenses';
import Infos from './components/Infos';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';
import { generateLocalKey } from './actions';
import { useFonts } from 'expo-font';
import { styles } from './styles';
import { AppState, View, Image } from 'react-native';
import { useHistory } from 'react-router';

const App = withState()(
    (s) => ({
        localKey: s.system.localKey
    }),
    ({ dispatch, localKey }) => {

        const history = useHistory();
        const [initialUrl, setInitialUrl] = useState<string>(undefined);
        const [hasParsedInitialURL, setHasParsedInitialURL] = useState(false);
        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasPluggedStateChange, setHasPluggedStateChange] = useState(false);

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
            if (!initialUrl) {
                Linking.getInitialURL().then((url) => {
                    parseUrl(url);
                });
                Linking.addEventListener('url', ({ url }) => {
                    parseUrl(url);
                });
                setHasParsedInitialURL(true);
            }
        }, [initialUrl, parseUrl]);

        useEffect(() => {
            if (initialUrl)
                history.push(`/checkin/${initialUrl}`);
        }, [initialUrl, history]);

        useEffect(() => {
            if (!localKey && !hasRequestedLocalKey) {
                dispatch(generateLocalKey()).then(() => {
                    setHasRequestedLocalKey(true);
                });
            } else
                setHasRequestedLocalKey(true);
        }, [dispatch, hasRequestedLocalKey, localKey]);

        const handleAppStateChange = useCallback((nextAppState: string) => {
            if (nextAppState === 'active')
                history.push('/');
        }, [history]);

        useEffect(() => {
            if (!hasPluggedStateChange) {
                AppState.addEventListener('change', handleAppStateChange);
                setHasPluggedStateChange(true);
            }
        }, [handleAppStateChange, hasPluggedStateChange]);

        if (!fontsLoaded || !hasRequestedLocalKey || !hasParsedInitialURL)
            return <View style={styles.container}>
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
