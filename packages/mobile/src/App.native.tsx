import React, { useEffect, useState, useCallback } from 'react';
import { withState } from './store';
import * as Linking from 'expo-linking';
import { Redirect, Route, Switch } from './ReactRouter';
import About from './About';
import Home from './components/Home';
import Scanned from './components/Scanned';
import Chat from './components/Chat';
import Scanner from './components/Scanner';
import { View, Text, Image, StyleSheet } from 'react-native';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';
import { generateLocalKey } from './actions';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    image: {
        height: '20%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const App = withState()((s) => ({
    localKey: s.system.localKey,
    showOnboarding: s.system.showOnboarding
}), ({ dispatch, localKey, showOnboarding }) => {

    const [initialUrl, setInitialUrl] = useState<string>(undefined);
    const [hasParsedInitialURL, setHasParsedInitialURL] = useState(false);
    const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);

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
        if (!hasRequestedLocalKey) {
            dispatch(generateLocalKey());
            setHasRequestedLocalKey(true);
        }
    }, [dispatch, hasRequestedLocalKey]);

    if (!localKey)
        return <>
            <Text>Generating a key ...</Text>
        </>;

    if (!hasParsedInitialURL)
        return <>
            <Text>Checking loading url ...</Text>
        </>;

    if (initialUrl)
        return <View style={styles.container} >
            <Image
                source={require('./assets/logo.png')}
                resizeMode={'contain'}
                style={styles.image}
            />
            <Text>Cheking in {initialUrl} ...</Text>
        </View>;

    return (
        <>
            <Switch>
                <Route path="/onboarding" component={OnboardingScreen} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/chat" component={Chat} />
                <Route path="/scanner" component={Scanner} />
                <Route path="/scanned" component={Scanned} />
                <Route render={() => {
                    if (showOnboarding)
                        return <Redirect to="/onboarding" />;
                    return <Redirect to="/home" />;
                }} />
            </Switch>
        </>
    );
});

export default App;
