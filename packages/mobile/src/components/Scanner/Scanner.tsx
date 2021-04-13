import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Button, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { styles } from './styles';
import { parseCode, Sources, ParsedCode } from '../Checkin/dataParser';
import { Redirect } from 'react-router';
import { commonStyles } from '../commonStyles';
import i18n from 'i18n-js';


const Scanner: React.FC = () => {

    const [hasPermission, setHasPermission] = useState<boolean>(null);
    const [venuInfo, setVenuInfo] = useState<ParsedCode>();
    const [test, setTest] = useState<string>();
    const [testType, setTestType] = useState<'covidTest' | 'covidAntibodyTest'>();
    const [error, setError] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [askForTestType, setAskForTestType] = useState<boolean>(false);

    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme !== 'dark' ? 'white' : 'black';
    const themeModalStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const themeLogoStyle = colorScheme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';

    const handleBarCodeScanned = (code) => {
        const parsedCode = parseCode(code);
        if (parsedCode.source !== Sources.INVALID) {
            setShowModal(false);
            setVenuInfo(parsedCode);
        } else if (code.type === 'org.iso.Code128') {
            setAskForTestType(true);
            setTest(code.data);
        } else {
            setError('Sorry, we were unable to recognise this code');
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
                <Text style={{ fontSize: 24, color: themeTextStyle }}>{i18n.t('APP_SCANNING')}...</Text>
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
                    <Entypo name='chevron-left' style={{ alignSelf: 'center', color: themeTextStyle }} size={30} />
                </Link>
            </TouchableOpacity>
        </>;

    return (
        <MainLayout backgroundColor='#00b0ee' withNavigation={false}>
            <Modal isVisible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <MaterialIcons name='error' size={84} color={themeModalStyle} />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                        {error}
                    </Text>
                    <Button title='Close' onPress={() => setShowModal(false)} />
                </View>
            </Modal>
            <Modal isVisible={askForTestType}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                        Is this a barcode for an infection test or an antibody test?
                    </Text>
                    <View style={{ flexDirection: 'row', padding: 15, alignContent: 'center', justifyContent: 'center' }}>
                        <Button title='Infection' onPress={() => { setAskForTestType(false); setTestType('covidTest'); }} />
                        <Button title='Antibody' onPress={() => { setAskForTestType(false); setTestType('covidAntibodyTest'); }} />
                    </View>
                </View>
            </Modal>
            {composition}
        </MainLayout>
    );
};

export default Scanner;
