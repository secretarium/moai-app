import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { Route, Switch } from "./ReactRouter";
import About from "./About";
import Chat from "./pages/Chat/Chat";
import { View, Text, Image, StyleSheet } from "react-native";
import { useCallback } from "react";

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
    const [initialUrl, setInitialUrl] = useState<string>();

    const parseUrl = useCallback((url: string | null | undefined) => {
        const comps = url ? url.split("/").slice(-2) : undefined;
        if (comps?.length === 2 && comps[0] === "check")
            setInitialUrl(comps[1]);
        else setInitialUrl(undefined);
    }, []);

    useEffect(() => {
        if (!initialUrl) {
            Linking.getInitialURL().then((url) => {
                parseUrl(url);
            });

            Linking.addEventListener("url", ({ url }) => {
                parseUrl(url);
            });
        }
    }, [initialUrl, parseUrl]);

    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                        <View style={styles.container}>
                            <Image
                                source={require("./assets/logo.png")}
                                resizeMode={"contain"}
                                style={styles.image}
                            />
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
