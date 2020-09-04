import React from "react";
import { Route } from "./react-router";
import { View, Text } from "react-native";
import Chat from "./pages/Chat/Chat";

const App: React.FC = () => (
    <>
        <Route exact path="/" component={Chat} />
        <Route
            path="/about"
            render={() => (
                <View>
                    <Text>About</Text>
                </View>
            )}
        />
    </>
);
export default App;
