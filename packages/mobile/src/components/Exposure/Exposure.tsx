import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useNavigate } from 'react-router';
import { commonStyles } from './styles';
import i18n from '../../services/i18n';
import { withState } from '../../store';
import { useTheme } from '../../hooks/useTheme';
import LogoBlack from '../../assets/logo-black.png';
import LogoWhite from '../../assets/logo-white.png';
import Pin86 from '../../assets/pin-86ab50.png';
import Pin64 from '../../assets/pin-648fff.png';
import PinA1 from '../../assets/pin-a11708.png';
import PinD7 from '../../assets/pin-d7230e.png';
import PinDC from '../../assets/pin-dc267f.png';
import PinFE from '../../assets/pin-fe6100.png';
import PinFF from '../../assets/pin-ffb000.png';

const Exposure = withState()((s) => ({
    risk: s.exposure.risk
}), ({ risk }) => {

    const naviguate = useNavigate();

    const [riskIndex, setRiskIndex] = useState<number>();
    const [pinColor, setPinColor] = useState<string>();
    const [color, setColor] = useState<string>();
    const [colorAlt, setColorAlt] = useState<string>();
    const [visuallyImpaired, isVisuallyImpaired] = useState<boolean>(false);
    const { colors, theme } = useTheme();
    const themeLogoStyle = theme !== 'dark' ? LogoBlack : LogoWhite;
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    useEffect(() => {
        if (risk) {
            setRiskIndex(risk.riskIndex);
            setPinColor(risk.colour.substring(1));
            setColor(risk.colour.substring(1));
            setColorAlt(risk.visuallyImpairedColour.substring(1));
        }
    }, [risk]);

    /**
     * Function to switch between non and visually impaired colors
     * @param on - A boolean to switch the colors for visually impaired
     */
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
        0: i18n.t('APP_LOW'),
        1: i18n.t('APP_MEDIUM'),
        2: i18n.t('APP_HIGH')
    };

    /**
     * Function to render a Moai pin
     * @returns A Moai pin in the color based on the exposure level
     */
    const renderPin = () => {
        switch (pinColor) {
            case '86ab50':
                return <Image
                    source={Pin86}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case '648fff':
                return <Image
                    source={Pin64}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'a11708':
                return <Image
                    source={PinA1}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'd7230e':
                return <Image
                    source={PinD7}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'dc267f':
                return <Image
                    source={PinDC}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'fe6100':
                return <Image
                    source={PinFE}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            case 'ffb000':
                return <Image
                    source={PinFF}
                    resizeMode={'contain'}
                    style={commonStyles.pin}
                />;
            default:
                return <Text>{i18n.t('APP_LOADING')}...</Text>;
        }
    };

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: colors.text, top: 30 }}>
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
                <Text style={[commonStyles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: colors.text, backgroundColor: colors.button }]}>
                    {i18n.t('APP_EXPOSURE_RISK_RESULT')}: <Bold>{exposure[Number(riskIndex)]}</Bold>
                </Text>
            </View>
            <View style={commonStyles.homeButtonContainer} >
                <TouchableOpacity onPress={() => naviguate('/')} style={[commonStyles.homeButton, { backgroundColor: colors.button, marginBottom: 15 }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_GO_HOME')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => visuallyImpaired === false ? handleVisuallyImpaired(true) : handleVisuallyImpaired(false)} style={[commonStyles.homeButton, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{visuallyImpaired === false ? i18n.t('APP_TURN_ON_COLOUR_BLIND_MODE') : i18n.t('APP_TURN_OFF_COLOUR_BLIND_MODE')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
});

export default Exposure;
