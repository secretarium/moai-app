import React from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router';
import i18n from 'i18n-js';
import { withState } from '../../store';
import QRCode from 'react-native-qrcode-svg';


type CertificateProps = RouteComponentProps<{
    userDigest: string;
}>;

const Certificate = withState<CertificateProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { userDigest } } = match;

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        return (
            <MainLayout goBackRoute={'/immunity'} showGoBack={true}>
                <View style={styles.qrCodeTitle}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_IMMUNITY_CERTIFICATE')}
                    </Text>
                </View>
                <View style={styles.qrCodeContainer}>
                    <View style={styles.qrCode}>
                        <QRCode value={userDigest} size={250} />
                    </View>
                </View>
            </MainLayout>
        );
    });

export default Certificate;
