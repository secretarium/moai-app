import React, { useEffect, useState, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "./ReactRouter";
import About from "./About";
import Chat from "./pages/Chat/Chat";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Onboarding from "./components/Onboarding/Onboarding";
import { AppState } from "./reducers/index";
import { OnboardingActions } from "./actions/onboardingActions";
import { SHOW_ONBOARDING } from "./actions/types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    image: {
        height: "20%",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
});

const App: React.FC = () => {
    const [showOnboarding, setShowOnboarding] = useState<boolean>()
    const { onboardUser } = useSelector((state: AppState) => state.onboarding);
    const onboardingDispatch = useDispatch<Dispatch<OnboardingActions>>();

    useEffect(() => {
        setShowOnboarding(onboardUser);
    }, [onboardUser])

    const onPress = (): void => {
        onboardingDispatch({ type: SHOW_ONBOARDING, payload: true });
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
                            <Text>Testing Redux</Text>
                            {onboardUser === true ? (
                                <Onboarding />
                            ) : (
                                <Text>User finished onboarding!</Text>
                            )}
                            {/* <TouchableOpacity onPress={onPress}>
                                <Text>Press here to test</Text>
                                <Text>persistence: {onboardUser}</Text>
                            </TouchableOpacity> */}
                            {console.log(`testing ${onboardUser}`)}
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
