import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const FontLoader: React.FC = ({ children }) => {

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
    });

    if (!fontsLoaded)
        return <Text>Loading...</Text>;
    else
        return <>{children}</>;

};


export default FontLoader;
