import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from "expo-barcode-scanner";
import styles from "../../styles/scanner";

const Scanner: React.FC = () => {
    const [permission, setPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [buttonPress, setButtonPress] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned`);
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
                onPress={() => setButtonPress(true)}
            >
                <Text style={styles.text}>Scan Code</Text>
            </TouchableOpacity>
            {buttonPress && (
                <>
                    <BarCodeScanner
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        style={StyleSheet.absoluteFillObject}
                    />
                    <SafeAreaView style={styles.goBack}>
                        <TouchableOpacity
                            style={styles.roundedButton}
                            onPress={() => {
                                setScanned(false);
                                setButtonPress(false);
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

{
    /* <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
            }}
        >
            <Button title={"Scan"} onPress={() => setButtonPress(true)} />
            {buttonPress && (
                <>
                    <BarCodeScanner
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Button
                        title={"Go Back"}
                        onPress={() => setButtonPress(false)}
                    />
                </>
            )}
            {scanned && (
                <Button
                    title={"Tap to Scan Again"}
                    onPress={() => setScanned(false)}
                />
            )}
        </View> */
}
