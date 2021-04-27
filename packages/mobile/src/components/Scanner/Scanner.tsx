import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Button, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { Link } from 'react-router-native';
import MainLayout from '../common/MainLayout';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { styles } from './styles';
import { parseCode, Sources, ParsedCode } from '../../services/scanner/dataParser';
import { Redirect } from 'react-router';
import { commonStyles } from '../commonStyles';
import i18n from 'i18n-js';
import { useTheme } from '../../hooks/useTheme';


const Scanner: React.FC = () => {

    const [hasPermission, setHasPermission] = useState<boolean>(null);
    const [venuInfo, setVenuInfo] = useState<ParsedCode>();
    const [test, setTest] = useState<string>();
    const [testType, setTestType] = useState<'covidTest' | 'covidAntibodyTest'>();
    const [error, setError] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [askForTestType, setAskForTestType] = useState<boolean>(false);
    const { colors, theme } = useTheme();
    const themeLogoStyle = theme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');

    const handleBarCodeScanned = (code) => {
        const parsedCode = parseCode(code);
        if (parsedCode.source !== Sources.INVALID) {
            setShowModal(false);
            setVenuInfo(parsedCode);
        } else if (code.type === 'org.iso.Code128') {
            setAskForTestType(true);
            setTest(code.data);
        } else {
            setError(i18n.t('APP_ERROR_SCANNER'));
            setShowModal(true);
            setVenuInfo(undefined);
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (venuInfo) {
        return <Redirect to={{ pathname: `/checkin/${[venuInfo.venue, venuInfo.source, venuInfo.type].filter(Boolean).join('/')}`, state: { testId: null } }} />;
    }

    if (test && testType) {
        return <Redirect to={{ pathname: `/checkin/${test}`, state: { testId: test, testType: testType } }} />;
    }

    let composition;

    if (hasPermission === null)
        composition = <Text>{i18n.t('APP_REQUEST_CAMERA_PERMISSION')}...</Text>;
    else if (hasPermission === false)
        composition = <>
            <View style={styles.messageContainer} >
                <Text style={[styles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: 'white' }]}>
                    {i18n.t('APP_NO_CAMERA_PERMISSION')}
                </Text>
                <TouchableOpacity onPress={() => Linking.openSettings()} style={styles.settingsButton}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: 'white' }}>{i18n.t('APP_GO_TO_SETTINGS')}</Text>
                </TouchableOpacity>
            </View>
        </>;
    else
        composition = <>
            <View style={styles.curvedView}>
                <Text style={{ fontSize: 24, color: colors.text }}>{i18n.t('APP_SCANNING')}...</Text>
                <Image
                    source={themeLogoStyle}
                    resizeMode={'contain'}
                    style={styles.logo}
                />
            </View>
            <View style={styles.cameraView}>
                <Camera
                    zoom={0}
                    onBarCodeScanned={handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: [
                            BarCodeScanner.Constants.BarCodeType.qr,
                            BarCodeScanner.Constants.BarCodeType.code128
                        ]
                    }}
                    style={[StyleSheet.absoluteFillObject]}
                />
            </View>
            <TouchableOpacity style={styles.roundedButton}>
                <Link to={'/'}>
                    <Entypo name='chevron-left' style={{ alignSelf: 'center', color: colors.text }} size={30} />
                </Link>
            </TouchableOpacity>
        </>;

    return (
        <MainLayout backgroundColor='#00b0ee' withNavigation={false}>
            <Modal isVisible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: colors.modalBackground }]}>
                    <MaterialIcons name='error' size={84} color={colors.modalText} />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.modalText }}>
                        {error}
                    </Text>
                    <Button title='Close' onPress={() => setShowModal(false)} />
                </View>
            </Modal>
            <Modal isVisible={askForTestType}>
                <View style={[commonStyles.modalContainer, { backgroundColor: colors.modalBackground }]}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.modalText }}>
                        {i18n.t('APP_INFECTION_OR_ANTIBODY')}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.button]} onPress={() => { setAskForTestType(false); setTestType('covidTest'); }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.text }}>
                                {i18n.t('APP_INFECTION')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={() => { setAskForTestType(false); setTestType('covidAntibodyTest'); }}>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.text }}>
                                {i18n.t('APP_ANTIBODY')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            { composition}
        </MainLayout >
    );
};

export default Scanner;
