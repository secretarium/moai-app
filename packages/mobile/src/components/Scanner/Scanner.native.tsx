import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, View, Image } from 'react-native';
import { Link, Redirect } from '../../ReactRouter';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import styles from './styles';

const Scanner: React.FC = () => {
    const [fontIsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')
    });
    const [permission, setPermission] = useState(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
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
        return <Redirect to={'/'} />;
    } else if (!fontIsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.curvedView}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 24, color: 'white', paddingTop: 25 }}>Scanning...</Text>
                    <Image
                        source={require('../../assets/logo-white.png')}
                        resizeMode={'contain'}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.cameraView}>
                    <Camera
                        zoom={0}
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        barCodeScannerSettings={{
                            barCodeTypes: [
                                BarCodeScanner.Constants.BarCodeType.qr
                            ]
                        }}
                        style={[
                            StyleSheet.absoluteFillObject
                        ]}
                    />

                </View>
                <TouchableOpacity
                    style={styles.roundedButton}
                    onPress={() => {
                        setScanned(false);
                    }}
                >
                    <Link to={'/'} underlayColor='transparent'>
                        <AntDesign name="back" size={30} color="white" />
                    </Link>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default Scanner;
