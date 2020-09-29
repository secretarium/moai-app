import React, { useState } from 'react';
import { Text, Image, View, Button } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { withState } from '../../store';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { styles, commonStyles } from './styles';
import Modal from 'react-native-modal';


const Scanned = withState()((s) => ({
    scanCounter: s.system.scanCounter
}), ({ scanCounter }) => {

    const [showModal, setShowModal] = useState<boolean>(scanCounter === 1 || scanCounter === 5 || scanCounter === 15);
    const colorScheme = useColorScheme();
    const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#404040';
    const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';
    const themeLogoStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? require('../../assets/logo.png') : require('../../assets/logo-white.png');
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    const hideModal = () => {
        setShowModal(false);
    };

    return (
        <MainLayout showGoBack={true}>
            <Modal isVisible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeTextStyle }}>
                        Hi there! Remember to use the Moai App to scan the barcode, after getting tested for the coronavirus!
                    </Text>
                    <Button title="Got it!" onPress={hideModal} />
                </View>
            </Modal>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Success!</Text>
                <Image
                    source={themeLogoStyle}
                    resizeMode={'contain'}
                    style={commonStyles.logo}
                />
                <Link to={'/scanner'} style={commonStyles.pinButton} underlayColor='transparent'>
                    <Image
                        source={require('../../assets/pin-success.png')}
                        resizeMode={'contain'}
                        style={commonStyles.pin}
                    />
                </Link>
            </View>
            <View style={styles.messageContainer} >
                <Text style={[styles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                    <Bold>How NHS Test and Trace will contact you?</Bold>{'\n'}{'\n'}
                        You will be contacted via messaging, directly inside of Moai!{'\n'}{'\n'}
                        You'll be asked to sign in to the NHS Test and Trace contact tracing website at https://contact-tracingphe.gov.uk
                </Text>
            </View>
        </MainLayout>
    );
});

export default Scanned;