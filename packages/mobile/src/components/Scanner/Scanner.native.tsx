import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { ScanningActions } from 'actions/scanningActions';
//import { SAVE_QR_CODE } from 'actions/types';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, View, Image, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link, Redirect } from '../../ReactRouter';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import styles from './styles';

const Scanner: React.FC = () => {
    const scannedCodeDispatch = useDispatch<Dispatch<ScanningActions>>();

    const [fontIsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')
    });
    const [permission, setPermission] = useState(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? 'white' : 'black';
    const themeLogoStyle = colorScheme === 'light' ? require('../../assets/logo-white.png') : require('../../assets/logo.png');
    const themeStatusBarStyle = colorScheme === 'light' ? 'light-content' : 'dark-content';

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        scannedCodeDispatch({ type: 'SAVE_QR_CODE', payload: data });
        setRedirect(true);
        alert(`Code with type ${type} and data ${data} has been scanned!`);
    };

    if (permission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

    if (redirect === true) {
        return <Redirect to={'/scanned'} />;
    } else if (!fontIsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={themeStatusBarStyle} backgroundColor='#00b0ee' />
                <View style={styles.curvedView}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 24, color: themeTextStyle }}>Scanning...</Text>
                    <Image
                        source={themeLogoStyle}
                        resizeMode={'contain'}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.cameraView}>
                    <Camera
                        zoom={0}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }}
                        style={[StyleSheet.absoluteFillObject]}
                    />
                </View>
                <TouchableOpacity style={styles.roundedButton} onPress={() => { setScanned(false); }}>
                    <Link to={'/'} underlayColor='transparent'>
                        <AntDesign name="back" size={30} color={themeTextStyle} />
                    </Link>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default Scanner;
