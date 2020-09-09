import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import styles from "../../styles/scanner";

const Scanner: React.FC = () => {
    const [permission, setPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [openScanner, setOpenScanner] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Code with type ${type} and data ${data} has been scanned`);
    };

    if (permission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.circleButton}
                onPress={() => setOpenScanner(true)}
            >
                <Text style={styles.text}>Scan Code</Text>
            </TouchableOpacity>
            {openScanner && (
                <>
                    <Camera
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        barCodeScannerSettings={{
                            barCodeTypes: [
                                BarCodeScanner.Constants.BarCodeType.qr,
                            ],
                        }}
                        style={[
                            StyleSheet.absoluteFillObject,
                            styles.cameraContainer,
                        ]}
                    />
                    <SafeAreaView style={styles.goBack}>
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => {
                                setScanned(false);
                                setOpenScanner(false);
                            }}
                        >
                            <AntDesign name="back" size={30} color="white" />
                        </TouchableOpacity>
                    </SafeAreaView>
                </>
            )}
            {scanned && (
                <SafeAreaView style={styles.scanAgain}>
                    <TouchableOpacity
                        style={styles.roundedButton}
                        onPress={() => setScanned(false)}
                    >
                        <Text style={styles.text}>Scan Again</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
        </SafeAreaView>
    );
};

export default Scanner;
