import React, { useState } from 'react';
import { Text, Image, View, Button, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { commonStyles } from './styles';
import Modal from 'react-native-modal';
import { useHistory } from 'react-router';
import i18n from 'i18n-js';


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
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <Modal isVisible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeTextStyle }}>
                        {i18n.t('APP_USE_APP_TO_SCAN_TEST')}
                    </Text>
                    <Button title={`${i18n.t('APP_GOT_IT')}!`} onPress={() => setShowModal(false)} />
                </View>
            </Modal>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>{i18n.t('APP_SUCCESS')}!</Text>
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
            <View style={commonStyles.messageContainer} >
                <Text style={[commonStyles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                    <Bold>{i18n.t('APP_HOW_WILL_WE_CONTACT_YOU')}?</Bold>{'\n'}{'\n'}
                    {i18n.t('APP_CONTACT_VIA_MESSAGING')}!
                </Text>
            </View>
            <View style={commonStyles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_GO_HOME')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
});

export default Scanned;