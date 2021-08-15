import React from 'react';
import { Text, Image, View } from 'react-native';
import { Link } from 'react-router-native';
import MainLayout from '../common/MainLayout';
import { commonStyles } from './styles';
import i18n from 'i18n-js';
import { useTheme } from '../../hooks/useTheme';


const Home: React.FC = () => {

    const { colors, theme } = useTheme();
    const themeLogoStyle = theme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');

    return (
        <MainLayout showGoBack={false}>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: colors.text, top: 30 }}>{i18n.t('APP_TAP_TO_SCAN')}</Text>
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