import React, { useState } from 'react';
import { Text, Image, View, Button, TouchableOpacity } from 'react-native';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { commonStyles } from './styles';
import Modal from 'react-native-modal';
import { useHistory } from 'react-router';
import i18n from 'i18n-js';
import { useTheme } from '../../hooks/useTheme';


const Scanned = withState()((s) => ({
    scanCounter: s.system.scanCounter
}), ({ scanCounter }) => {

    const history = useHistory();
    const [showModal, setShowModal] = useState<boolean>(scanCounter === 1 || scanCounter === 5 || scanCounter === 15);
    const { colors, theme } = useTheme();
    const themeLogoStyle = theme !== 'dark' ? require('../../assets/logo-black.png') : require('../../assets/logo-white.png');
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <Modal isVisible={false}>
                <View style={[commonStyles.modalContainer, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: colors.text }}>
                        {i18n.t('APP_USE_APP_TO_SCAN_TEST')}
                    </Text>
                    <Button title={`${i18n.t('APP_GOT_IT')}!`} onPress={() => setShowModal(false)} />
                </View>
            </Modal>
            <View style={commonStyles.main}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: colors.text, top: 30 }}>{i18n.t('APP_SUCCESS')}!</Text>
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
                <Text style={[commonStyles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: colors.text, backgroundColor: colors.button }]}>
                    <Bold>{i18n.t('APP_HOW_WILL_WE_CONTACT_YOU')}?</Bold>{'\n'}{'\n'}
                    {i18n.t('APP_CONTACT_VIA_MESSAGING')}!
                </Text>
            </View>
            <View style={commonStyles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_GO_HOME')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
});

export default Scanned;