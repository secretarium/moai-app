import React, { useEffect, useState, useCallback, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Linking from 'expo-linking';
import { Route, Switch } from './ReactRouter';
import About from './About';
import Chat from './pages/Chat/Chat';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AppState } from './reducers/index';
import { OnboardingActions } from './actions/onboardingActions';
import { SHOW_ONBOARDING } from './actions/types';

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

const App: React.FC = () => {
    const [initialUrl, setInitialUrl] = useState<string>();
    const { onboardUser } = useSelector((state: AppState) => state.onboarding);
    const onboardingDispatch = useDispatch<Dispatch<OnboardingActions>>();

    const parseUrl = useCallback((url: string | null | undefined) => {
        const comps = url ? url.split('/').slice(-2) : undefined;
        if (comps?.length === 2 && comps[0] === 'check')
            setInitialUrl(comps[1]);
        else setInitialUrl(undefined);
    }, []);

    useEffect(() => {
        if (!initialUrl) {
            Linking.getInitialURL().then((url) => {
                parseUrl(url);
            });

            Linking.addEventListener('url', ({ url }) => {
                parseUrl(url);
            });
        }
    }, [initialUrl, parseUrl]);

    const onPress = (): void => {
        onboardingDispatch({ type: SHOW_ONBOARDING, payload: false });
        console.log(onboardUser);
    };

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                        <View style={styles.container}>
                            <Image
                                source={require('./assets/logo.png')}
                                resizeMode={'contain'}
                                style={styles.image}
                            />
                            <TouchableOpacity onPress={onPress}>
                                <Text>Press here to onboard</Text>
                            </TouchableOpacity>
                            {initialUrl ? (
                                <Text>Cheking in {initialUrl} ...</Text>
                            ) : null}
                        </View>
                    );
                }}
            />
            <Route path="/about" component={About} />
            <Route path="/chat" component={Chat} />
        </Switch>
    );
};

export default App;
