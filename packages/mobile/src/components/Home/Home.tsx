import React from 'react';
import { Text, Image, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { commonStyles } from './styles';
import { Entypo } from '@expo/vector-icons';


const Home: React.FC = () => {

    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? 'black' : 'white';
    const themeLogoStyle = colorScheme === 'light' ? require('../../assets/logo.png') : require('../../assets/logo-white.png');

    return (
        <MainLayout>
            <View style={commonStyles.main}>
                <Link to={'/chat'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                    <Entypo name="chat" size={40} color={themeTextStyle} />
                </Link>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Tap to scan</Text>
                <Image
                    source={themeLogoStyle}
                    resizeMode={'contain'}
                    style={commonStyles.logo}
                />
                <Link to={'/scanner'} style={commonStyles.pinButton} underlayColor='transparent'>
                    <Image
                        source={require('../../assets/pin-default.png')}
                        resizeMode={'contain'}
                        style={commonStyles.pin}
                    />
                </Link>
            </View>
        </MainLayout>
    );
};

export default Home;