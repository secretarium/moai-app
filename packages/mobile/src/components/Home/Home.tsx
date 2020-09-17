import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Link } from '../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

const Home: React.FC = () => {
    const [fontIsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')
    });

    if (!fontIsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 24 }}>Tap to scan</Text>
                <Image
                    source={require('../../assets/logo.png')}
                    resizeMode={'contain'}
                    style={styles.logo}
                />
                <Link to={'/scanner'} style={styles.pinButton} underlayColor='transparent'>
                    <Image
                        source={require('../../assets/pin-default.png')}
                        resizeMode={'contain'}
                        style={styles.pin}
                    />
                </Link>
                <Link to={'/chat'} style={styles.topLeftButton} underlayColor='transparent'>
                    <Entypo name="chat" size={40} color="#BEBEBE" />
                </Link>
                <Link to={'/about'} style={styles.topRightButton} underlayColor='transparent'>
                    <MaterialCommunityIcons name="information" size={40} color="#BEBEBE" />
                </Link>
            </SafeAreaView>
        );
    }
};

export default Home;