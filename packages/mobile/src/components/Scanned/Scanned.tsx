import React, { useState } from 'react';
import { Text, Image, View, Button, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { styles, commonStyles } from './styles';
import Modal from 'react-native-modal';
import { useHistory } from 'react-router';


const Scanned = withState()((s) => ({
    scanCounter: s.system.scanCounter
}), ({ scanCounter }) => {

    const history = useHistory();
    const [showModal, setShowModal] = useState<boolean>(scanCounter === 1 || scanCounter === 5 || scanCounter === 15);
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const themeLogoStyle = colorScheme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    return (
        <MainLayout showGoBack={true}>
            <Modal isVisible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeTextStyle }}>
                        Hi there! Remember to use the Moai App to scan the barcode, after getting tested for the coronavirus!
                    </Text>
                    <Button title="Got it!" onPress={() => setShowModal(false)} />
                </View>
            </Modal>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Success!</Text>
                <Image
                    source={themeLogoStyle}
                    resizeMode={'contain'}
                    style={commonStyles.logo}
                />
                <View style={commonStyles.pinButton}>
                    <Image
                        source={require('../../assets/pin-success.png')}
                        resizeMode={'contain'}
                        style={commonStyles.pin}
                    />
                </View>
            </View>
            <View style={styles.messageContainer} >
                <Text style={[styles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                    <Bold>How will NHS Test and Trace contact you?</Bold>{'\n'}{'\n'}
                        You will be contacted via messaging, directly inside of Moai!
                </Text>
            </View>
            <View style={styles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/')} style={[styles.homeButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Go back</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
});

export default Scanned;