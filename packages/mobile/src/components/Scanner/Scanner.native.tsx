import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link, Redirect } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import styles from './styles';

const Scanner = withState()(
    null,
    ({ dispatch }) => {

        const [permission, setPermission] = useState(null);
        const [scanned, setScanned] = useState<boolean>(false);
        const [redirect, setRedirect] = useState<boolean>(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeLogoStyle = colorScheme === 'light' ? require('../../assets/logo-white.png') : require('../../assets/logo.png');

        useEffect(() => {
            (async () => {
                const { status } = await Camera.requestPermissionsAsync();
                setPermission(status === 'granted');
            })();
        }, []);

        const handleBarCodeScanned = ({ type, data }) => {
            setScanned(true);
            dispatch({ type: actionTypes.MOAI_SAVE_QR_CODE, payload: data });
            dispatch({ type: actionTypes.MOAI_INCREMENT_SCAN_COUNTER });
            setRedirect(true);
            //alert(`Code with type ${type} and data ${data} has been scanned!`);
        };

        let composition;

        if (permission === null)
            composition = <Text>Requesting for camera permission...</Text>;
        else if (permission === false)
            composition = <Text>No access to camera...</Text>;
        else if (redirect === true)
            composition = <Redirect to={'/scanned'} />;
        else
            composition = <>
                <View style={styles.curvedView}>
                    <Text style={{ fontSize: 24 }}>Scanning...</Text>
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
                    <Link to={'/'}>
                        <AntDesign name="back" size={30} />
                    </Link>
                </TouchableOpacity>
            </>;

        return (
            <MainLayout backgroundColor='#00b0ee' withNavigation={false}>
                {composition}
            </MainLayout>
        );
    }
);

export default Scanner;
