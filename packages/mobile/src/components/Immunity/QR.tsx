import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MainLayout from '../common/MainLayout';
import { RouteComponentProps } from 'react-router';
import { styles, commonStyles } from './styles';
import i18n from 'i18n-js';
import { withState } from '../../store';
import QRCode from 'react-native-qrcode-svg';
import { getVaccineCode } from '../../actions';
import { useTheme } from '../../hooks/useTheme';

type QRProps = RouteComponentProps<{
    type: string;
}>;

const QR = withState<QRProps>()((s) => ({
    certificate: s.immunity.immunityCertificate,
    vaccineId: s.system.vaccineId
}), ({ certificate, vaccineId, match, dispatch }) => {

    const { params: { type } } = match;
    const [qrData, setQrData] = useState<string>();

    useEffect(() => {
        if (type === 'certificate' && certificate)
            setQrData(JSON.stringify(certificate));
        else if (type === 'vaccine' && vaccineId)
            setQrData(vaccineId);
    }, [certificate, type, vaccineId]);

    const { colors } = useTheme();

    return (
        <MainLayout goBackRoute={'/immunity'} showGoBack={true}>
            <View style={styles.qrCodeTitle}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    {type === 'certificate'
                        ? i18n.t('APP_IMMUNITY_CERTIFICATE')
                        : i18n.t('APP_VACCINE_ID')}
                </Text>
            </View>
            <View style={styles.qrCodeContainer}>
                <View style={styles.qrCode}>
                    <QRCode value={qrData} size={250} />
                </View>
            </View>
            {type === 'certificate'
                ? null
                : <View style={commonStyles.homeButtonContainer} >
                    <TouchableOpacity onPress={() => dispatch(getVaccineCode())} style={[commonStyles.homeButton, { backgroundColor: colors.button, marginBottom: 15, top: 30 }]}>
                        <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_CHANGE_VACCINE_ID')}</Text>
                    </TouchableOpacity>
                </View>}
        </MainLayout>
    );
});

export default QR;
