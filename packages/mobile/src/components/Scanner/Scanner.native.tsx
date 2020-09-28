import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link, Redirect } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { Entypo } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import styles from './styles';
import { SCP, Constants } from '../../../../connect/src';
import { parseCode, Sources, ParsedCode } from './dataParser';

const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';

const Scanner = withState()(
    (s) => ({
        localKey: s.system.localKey
    }),
    ({ dispatch, localKey }) => {

        const [hasPermission, setHasPermission] = useState<boolean>(null);
        const [hasScanned, setHasScanned] = useState(false);
        const [isConnected, setIsConnected] = useState(false);
        const [isCommitting, setIsCommitting] = useState(false);
        const [redirect, setRedirect] = useState(false);
        const [venuInfo, setVenuInfo] = useState<ParsedCode>();
        const [error, setError] = useState<string>();

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'white' : 'black';
        const themeLogoStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? require('../../assets/logo-white.png') : require('../../assets/logo.png');

        useEffect(() => {
            (async () => {
                const { status } = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        }, []);

        useEffect(() => {
            async function connectBackend() {
                if (localKey && scp.state === Constants.ConnectionState.closed && isCommitting) {
                    scp.connect('wss://ovh-uk-eri-2288-2.node.secretarium.org:443', localKey, 'rliD_CISqPEeYKbWYdwa-L-8oytAPvdGmbLC0KdvsH-OVMraarm1eo-q4fte0cWJ7-kmsq8wekFIJK0a83_yCg==').then(() => {
                        setIsConnected(true);
                    }).catch((error) => {
                        setError(isDev ? `Connection error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                        setIsConnected(false);
                        console.error(error);
                    });
                }
                else if (scp.state === Constants.ConnectionState.secure && isCommitting)
                    setIsConnected(false);
            }
            connectBackend();
        }, [localKey, isCommitting, error]);

        useEffect(() => {
            if (isConnected && venuInfo) {

                const query = scp.newTx('moai', 'check-in', `moai-qr-${Date.now()}`, venuInfo);
                query.onExecuted?.(() => {
                    dispatch({ type: actionTypes.MOAI_SAVE_QR_CODE, payload: venuInfo });
                    dispatch({ type: actionTypes.MOAI_INCREMENT_SCAN_COUNTER });
                    setRedirect(true);
                });
                query.onError?.((error: any) => {
                    console.error('Error', error);
                    setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                    setVenuInfo(undefined);
                    setIsConnected(false);
                });
                query.send?.()
                    .catch((error) => {
                        console.error('Error', error);
                        setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                        setVenuInfo(undefined);
                        setIsConnected(false);
                    });
            }
        }, [dispatch, isConnected, venuInfo]);

        const handleBarCodeScanned = (code) => {
            setHasScanned(true);
            const parsedCode = parseCode(code);
            if (parsedCode.source !== Sources.INVALID) {
                setVenuInfo(parsedCode);
                setIsCommitting(true);
            } else {
                setError('Sorry, we were not able to recognise this QRCode');
            }
        };

        let composition;

        if (hasPermission === null)
            composition = <Text>Requesting for camera permission...</Text>;
        else if (hasPermission === false)
            composition = <Text>No access to camera</Text>;
        else if (redirect === true)
            composition = <Redirect to={'/scanned'} />;
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
                        onBarCodeScanned={hasScanned ? undefined : handleBarCodeScanned}
                        barCodeScannerSettings={{
                            barCodeTypes: [
                                BarCodeScanner.Constants.BarCodeType.qr,
                                BarCodeScanner.Constants.BarCodeType.code128
                            ]
                        }}
                        style={[StyleSheet.absoluteFillObject]}
                    />
                </View>
                <TouchableOpacity style={styles.roundedButton} onPress={() => { setHasScanned(false); }}>
                    <Link to={'/'}>
                        <Entypo name="chevron-left" style={{ alignSelf: 'center', color: themeTextStyle }} size={30} />
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
