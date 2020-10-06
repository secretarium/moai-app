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
import { styles } from './styles';
import { Text, View, Image } from 'react-native';
import { useHistory } from 'react-router';

const App = withState()(
    (s) => ({
        localKey: s.system.localKey
    }),
    ({ dispatch, localKey }) => {

        const history = useHistory();
        const [initialUrl, setInitialUrl] = useState<string>(undefined);
        const [pastInitialUrl, setPastInitialUrl] = useState<string>(undefined);
        const [error, setError] = useState<any>();
        const [hasRequestedInitialURL, setHasRequestedInitialURL] = useState(false);
        const [hasParsedInitialURL, setHasParsedInitialURL] = useState(true);
        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasObtainedLocalKey, setHasObtainedLocalKey] = useState(false);
        // const [hasPluggedStateChange, setHasPluggedStateChange] = useState(false);

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
            if ((pastInitialUrl && initialUrl && initialUrl !== pastInitialUrl) || (!pastInitialUrl && initialUrl)) {
                try {
                    history.push(`/checkin/${initialUrl}`);
                } catch (e) {
                    setError(e);
                }
                setPastInitialUrl(initialUrl);
            }
        }, [history, initialUrl, pastInitialUrl]);

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

        // const handleAppStateChange = useCallback((nextAppState: string) => {
        //     if (nextAppState === 'active') {
        //         setHasRequestedInitialURL(false);
        //         if (!initialUrl && history.location.pathname.slice(0, 8) === '/scanner') {
        //             history.push('/');
        //         }
        //     }
        // }, [history, initialUrl]);

        // useEffect(() => {
        //     if (!hasPluggedStateChange) {
        //         AppState.addEventListener('change', handleAppStateChange);
        //         setHasPluggedStateChange(true);
        //     }
        // }, [handleAppStateChange, hasPluggedStateChange]);

        if (!hasObtainedLocalKey || !hasParsedInitialURL)
            return <View style={styles.container}>
                <Text>...</Text>
                <Text>...</Text>
                <Text>...</Text>
                <Text>...</Text>
                <Text
                    style={{
                        color: 'grey'
                    }} >{JSON.stringify({
                        hasRequestedLocalKey,
                        hasRequestedInitialURL,
                        hasObtainedLocalKey,
                        hasParsedInitialURL,
                        pastInitialUrl,
                        initialUrl,
                        error
                    }, null, 4)}</Text>
                <Image source={require('../assets/splash.png')} style={styles.backgroundImage} />
            </View>;

        return (
            <>
                <View>
                    <Text>...</Text>
                    <Text>...</Text>
                    <Text>...</Text>
                    <Text>...</Text>
                    <Text
                        style={{
                            color: 'grey'
                        }} >{JSON.stringify({
                            hasRequestedLocalKey,
                            hasRequestedInitialURL,
                            hasObtainedLocalKey,
                            hasParsedInitialURL,
                            pastInitialUrl,
                            initialUrl,
                            error
                        }, null, 4)}</Text>
                </View>
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
