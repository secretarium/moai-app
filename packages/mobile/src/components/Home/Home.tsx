import React from 'react';
import { Text, Image, View } from 'react-native';
import { Link } from 'react-router-native';
import MainLayout from '../common/MainLayout';
import { commonStyles } from './styles';
import i18n from '../../services/i18n';
import { useTheme } from '../../hooks/useTheme';
import LogoBlack from '../../assets/logo-black.png';
import LogoWhite from '../../assets/logo-white.png';
import PinDefault from '../../assets/pin-default.png';

const Home: React.FC = () => {

    const { colors, theme } = useTheme();
    const themeLogoStyle = theme !== 'dark' ? LogoBlack : LogoWhite;

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
                        source={PinDefault}
                        resizeMode={'contain'}
                        style={commonStyles.pin}
                    />
                </Link>
            </View>
        </MainLayout>
    );
};

export default Home;