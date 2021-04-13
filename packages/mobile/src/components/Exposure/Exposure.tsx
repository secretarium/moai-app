import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { useHistory } from 'react-router';
import { commonStyles } from './styles';
import i18n from 'i18n-js';
import { withState } from '../../store';

const Exposure = withState()((s) => ({
    risk: s.exposure.risk
}), ({ risk }) => {

    const history = useHistory();

    const [riskIndex, setRiskIndex] = useState<number>();
    const [pinColor, setPinColor] = useState<string>();
    const [color, setColor] = useState<string>();
    const [colorAlt, setColorAlt] = useState<string>();
    const [visuallyImpaired, isVisuallyImpaired] = useState<boolean>(false);

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeLogoStyle = colorScheme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    useEffect(() => {
        if (risk) {
            setRiskIndex(risk.riskIndex);
            setPinColor(risk.colour.substring(1));
            setColor(risk.colour.substring(1));
            setColorAlt(risk.visuallyImpairedColour.substring(1));
        }
    }, [risk]);

    const handleVisuallyImpaired = (on: boolean) => {
        if (on === true) {
            isVisuallyImpaired(true);
            setPinColor(colorAlt);
        } else {
            isVisuallyImpaired(false);
            setPinColor(color);
        }
    };

    const exposure = {
        1: 'LOW',
        2: 'MEDIUM',
        3: 'HIGH'
    };

    const renderPin = () => {
        switch (pinColor) {
            case '86ab50':
                return <Image
                    source={require('../../assets/pin-86ab50.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case '648fff':
                return <Image
                    source={require('../../assets/pin-648fff.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'a11708':
                return <Image
                    source={require('../../assets/pin-a11708.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'd7230e':
                return <Image
                    source={require('../../assets/pin-d7230e.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'dc267f':
                return <Image
                    source={require('../../assets/pin-dc267f.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'fe6100':
                return <Image
                    source={require('../../assets/pin-fe6100.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'ffb000':
                return <Image
                    source={require('../../assets/pin-ffb000.png')}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            default:
                return <Text>Loading...</Text>;
        }
    };

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
                <View style={commonStyles.pinButton}>
                    {renderPin()}
                </View>
            </View>
            <View style={commonStyles.messageContainer} >
                <Text style={[commonStyles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                    {i18n.t('APP_EXPOSURE_RISK_RESULT')}: <Bold>{exposure[Number(riskIndex)]}</Bold>
                </Text>
            </View>
            <View style={commonStyles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle, marginBottom: 15 }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_GO_HOME')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => visuallyImpaired === false ? handleVisuallyImpaired(true) : handleVisuallyImpaired(false)} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{visuallyImpaired === false ? i18n.t('APP_TURN_ON_COLOUR_BLIND_MODE') : i18n.t('APP_TURN_OFF_COLOUR_BLIND_MODE')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
});

export default Exposure;
