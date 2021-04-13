import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { useHistory, RouteComponentProps } from 'react-router';
import { Entypo } from '@expo/vector-icons';
import { openURL } from 'expo-linking';
import { commonStyles } from './styles';
import i18n from 'i18n-js';
import {
    requestImmunityCertificate,
    getImmunityCertificate,
    getImmunityRecords,
    getVaccineCode
} from '../../actions';

type ImmunityProps = RouteComponentProps<{
    userDigest: string;
}>;

const Immunity = withState<ImmunityProps>()((s) => ({
    records: s.immunity.immunityRecords,
    certificate: s.immunity.immunityCertificate,
    riskProfile: s.system.riskProfile,
    vaccineId: s.system.vaccineId
}), ({ records, certificate, riskProfile, vaccineId, match, dispatch }) => {

    const { params: { userDigest } } = match;
    const history = useHistory();

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    useEffect(() => {
        if (userDigest)
            dispatch(requestImmunityCertificate(userDigest));
    }, [userDigest, dispatch]);

    useEffect(() => {
        dispatch(getImmunityCertificate());
        dispatch(getImmunityRecords());
    }, []);

    const handleGetVaccineCode = () => {
        dispatch(getVaccineCode());
        history.push('/qrcode/vaccine');
    };

    const immunity = {
        1: 'Unknown',
        2: 'Vaccine',
        3: 'Natural'
    };

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <ScrollView>
                {riskProfile && vaccineId
                    ? null
                    : <>
                        <View style={{
                            paddingVertical: 30,
                            paddingHorizontal: 15
                        }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                                {i18n.t('APP_IMMUNITY_SETUP')}
                            </Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                                {i18n.t('APP_SETUP_YOUR_IMMUNITY')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => history.push('/feedback/riskProfile')}
                            style={[commonStyles.card, { backgroundColor: themeColorStyle, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{i18n.t('APP_CREATE_RISK_PROFILE')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleGetVaccineCode}
                            style={[commonStyles.card, { backgroundColor: themeColorStyle, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{i18n.t('APP_CREATE_VACCINE_ID')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                    </>}
                {certificate
                    ? <>
                        <View style={{
                            paddingVertical: 30,
                            paddingHorizontal: 15
                        }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                                {i18n.t('APP_IMMUNITY_CERTIFICATE')}
                            </Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                                {i18n.t('APP_VIEW_YOUR_IMMUNITY_CERTIFICATE')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => history.push('/qrcode/certificate')}
                            style={[commonStyles.card, { backgroundColor: themeColorStyle, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{i18n.t('APP_VIEW_IMMUNITY_CERTIFICATE')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                    </>
                    : null}
                {vaccineId
                    ? <>
                        <View style={{
                            paddingVertical: 30,
                            paddingHorizontal: 15
                        }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                                {i18n.t('APP_IMMUNITY_ID')}
                            </Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                                {i18n.t('APP_YOUR_IMMUNITY_ID')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => history.push('/qrcode/vaccine')}
                            style={[commonStyles.card, { backgroundColor: themeColorStyle, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{i18n.t('APP_VIEW_VACCINE_ID')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                    </>
                    : null}
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_IMMUNITY')}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                        {i18n.t('APP_IMMUNITY_CONTEXT')}
                    </Text>
                </View>
                <View>
                    {records.length > 1
                        ? <TouchableOpacity
                            onPress={() => openURL('https://moaiapp.com/check-certificate/')}
                            style={[commonStyles.card, { backgroundColor: themeColorStyle, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{i18n.t('APP_REQUEST_IMMUNITY_CERTIFICATE')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                        : null}
                    {records.length > 0
                        ? records.map((record, index) =>
                            <View style={[commonStyles.card, { backgroundColor: themeColorStyle, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]} key={index}>
                                <>
                                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>Immunity Type: {immunity[Number(record.type)]}</Text>
                                </>
                            </View>
                        )
                        : <Text style={{ fontFamily: 'Poppins-Bold', color: '#E95C59', paddingLeft: 15, marginBottom: 15 }}>{i18n.t('APP_EMPTY_IMMUNITY_RECORDS')}</Text>}
                </View>
            </ScrollView>
        </MainLayout>
    );
});

export default Immunity;