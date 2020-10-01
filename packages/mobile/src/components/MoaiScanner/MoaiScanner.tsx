import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Redirect } from '../../ReactRouter';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { actionTypes } from '../../actions/constants';
import { withState } from '../../store';
import styles from './styles';
import { SCP, Constants } from '../../../../connect/src';
import { parseCode, Sources, ParsedCode } from './dataParser';
import Modal from 'react-native-modal';
import { commonStyles } from '../commonStyles';
import { MaterialIcons } from '@expo/vector-icons';

const scp = new SCP();
const isDev = process.env.NODE_ENV === 'development';

const MoaiScanner = withState()(
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
        const [showModal, setShowModal] = useState<boolean>(false);

        // Color theme
        const colorScheme = useColorScheme();
        const themeModalStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';
        const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#404040';
        const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'white' : 'black';
        const themeLogoStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? require('../../assets/logo-white.png') : require('../../assets/logo.png');

        const hideModal = () => {
            setShowModal(false);
        };

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
                    setShowModal(true);
                });
                query.send?.()
                    .catch((error) => {
                        console.error('Error', error);
                        setError(isDev ? `Transaction error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
                        setVenuInfo(undefined);
                        setIsConnected(false);
                        setShowModal(true);
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
                setShowModal(true);
                setHasScanned(false);
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
            composition =
                <>
                    <View style={styles.curvedView}>
                        <Text style={{ fontSize: 24, color: themeTextStyle, paddingTop: 30 }}>Scanning...</Text>
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
                </>;

        return (
            <>
                <Modal isVisible={showModal}>
                    <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                        <MaterialIcons name='error' size={84} color={themeModalStyle} />
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeModalStyle }}>
                            {error}
                        </Text>
                        <Button title='Close' onPress={hideModal} />
                    </View>
                </Modal>
                {composition}
            </>
        );
    }
);

export default MoaiScanner;
