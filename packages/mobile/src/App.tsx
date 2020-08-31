import React from 'react';
import { Route } from './react-router';
import { View, Text } from 'react-native';

const App: React.FC = () => (
    <>
        <Route exact path="/" render={() => <View><Text>Home</Text></View>} />
        <Route path="/about" render={() => <View><Text>About</Text></View>} />
    </>
);

export default App;