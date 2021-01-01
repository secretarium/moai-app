import React from 'react';
import { View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { styles } from './styles';

const FontLoader: React.FC = ({ children }) => {

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf')
    });

    if (!fontsLoaded)
        return <View style={styles.container}>
            <Image source={require('../assets/splash.png')} style={styles.backgroundImage} />
        </View>;
    else
        return <>{children}</>;

};


export default FontLoader;
