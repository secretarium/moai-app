import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Button, Modal } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import styles from './styles';
import { parseCode, Sources, ParsedCode } from '../Checkin/dataParser';
import { Redirect } from 'react-router';
import { commonStyles } from '../commonStyles';


const Scanner: React.FC = () => {

    const [hasPermission, setHasPermission] = useState<boolean>(null);
    const [venuInfo, setVenuInfo] = useState<ParsedCode>();
    const [error, setError] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);

    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'white' : 'black';
    const themeModalStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';
    const themeLogoStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? require('../../assets/logo-white.png') : require('../../assets/logo.png');
    const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#404040';

    const handleBarCodeScanned = (code) => {
        const parsedCode = parseCode(code);
        if (parsedCode.source !== Sources.INVALID) {
            setShowModal(false);
            setVenuInfo(parsedCode);
        } else {
            setError('Sorry, we were not able to recognise this QRCode');
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

    if (venuInfo)
        return <Redirect to={`/checkin/${[venuInfo.venue, venuInfo.source, venuInfo.type].filter(Boolean).join('/')}`} />;

    let composition;

    if (hasPermission === null)
        composition = <Text>Requesting for camera permission...</Text>;
    else if (hasPermission === false)
        composition = <Text>No access to camera</Text>;
    else
        composition = <>
            <View style={styles.curvedView}>
                <Text style={{ fontSize: 24, color: themeTextStyle }}>Scanning...</Text>
                <Image
                    source={themeLogoStyle}
                    resizeMode={'contain'}
                    style={styles.logo}
                />
            </View>
            <View style={styles.cameraView}>
                <Camera
                    zoom={0}
                    onBarCodeScanned={venuInfo ? undefined : handleBarCodeScanned}
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
            <Modal visible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <MaterialIcons name='error' size={84} color={themeModalStyle} />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                        {error}
                    </Text>
                    <Button title='Close' onPress={() => setShowModal(false)} />
                </View>
            </Modal>
            {composition}
        </MainLayout>
    );
};

export default Scanner;
