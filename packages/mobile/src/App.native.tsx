import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as Linking from 'expo-linking';
import { Route, Switch } from './ReactRouter';
import About from './About';
import Home from './components/Home';
import Scanned from './components/Scanned';
import Chat from './components/Chat';
import Scanner from './components/Scanner';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppState } from './reducers/index';
import OnboardingScreen from './components/Onboarding/OnboardingScreen';


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

    const setInitialScreen = () => {
        if (onboardUser === true) {
            return <OnboardingScreen />;
        } else {
            return <View style={styles.container} >
                <Image
                    source={require('./assets/logo.png')}
                    resizeMode={'contain'}
                    style={styles.image}
                />
                {
                    initialUrl ? (
                        <Text>Cheking in {initialUrl} ...</Text>
                    ) : null
                }
            </View>;
        }
    };

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route
                path="/onboarding"
                render={() => setInitialScreen()}
            />
            <Route path="/about" component={About} />
            <Route path="/chat" component={Chat} />
            <Route path="/scanner" component={Scanner} />
            <Route path="/scanned" component={Scanned} />
        </Switch>
    );
};

export default App;
