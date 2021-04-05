import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { useHistory } from 'react-router';
import { commonStyles } from './styles';
import i18n from 'i18n-js';


const Exposure: React.FC = () => {

    const history = useHistory();

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeLogoStyle = colorScheme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>
                    {i18n.t('APP_EXPOSURE_RISK')}
                </Text>
                <Image
                    source={themeLogoStyle}
                    resizeMode={'contain'}
                    style={commonStyles.logo}
                />
                <View style={commonStyles.pinButton} >
                    <Image
                        source={require('../../assets/pin-648fff.png')}
                        resizeMode={'contain'}
                        style={commonStyles.pin}
                    />
                </View>
            </View>
            <View style={commonStyles.messageContainer} >
                <Text style={[commonStyles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                    {i18n.t('APP_EXPOSURE_RISK_RESULT')}:
                </Text>
            </View>
            <View style={commonStyles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle, marginBottom: 15 }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_GO_HOME')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_TURN_ON_COLOUR_BLIND_MODE')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
};

export default Exposure;
