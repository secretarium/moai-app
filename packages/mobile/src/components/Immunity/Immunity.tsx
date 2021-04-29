import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { useHistory, RouteComponentProps } from 'react-router';
import { Entypo } from '@expo/vector-icons';
import { openURL } from 'expo-linking';
import { commonStyles } from './styles';
import i18n from 'i18n-js';
import { useTheme } from '../../hooks/useTheme';
import {
    requestImmunityCertificate,
    getImmunityCertificate,
    getImmunityRecords,
    getVaccineCode
} from '../../actions';

type ImmunityProps = RouteComponentProps<{
    /**
     * An encrypted string based on user's passport scan
     */
    userDigest: string;
}>;

const Immunity = withState<ImmunityProps>()((s) => ({
    records: s.immunity.immunityRecords,
    certificate: s.immunity.immunityCertificate,
    riskProfile: s.system.riskProfile,
    vaccineId: s.system.vaccineId,
    requested: s.system.certificateRequested
}), ({ records, certificate, riskProfile, vaccineId, requested, match, dispatch }) => {

    const { params: { userDigest } } = match;
    const history = useHistory();
    const { colors } = useTheme();

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
        1: i18n.t('APP_UNKNOWN'),
        2: i18n.t('APP_VACCINE'),
        3: i18n.t('APP_NATURAL')
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
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                                {i18n.t('APP_IMMUNITY_SETUP')}
                            </Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                                {i18n.t('APP_SETUP_YOUR_IMMUNITY')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => history.push('/feedback/riskProfile')}
                            style={[commonStyles.card, { backgroundColor: colors.button, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_CREATE_RISK_PROFILE')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={colors.text}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleGetVaccineCode}
                            style={[commonStyles.card, { backgroundColor: colors.button, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_CREATE_VACCINE_ID')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={colors.text}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                    </>}
                {requested
                    ? <>
                        <View style={{
                            paddingVertical: 30,
                            paddingHorizontal: 15
                        }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                                {i18n.t('APP_IMMUNITY_CERTIFICATE')}
                            </Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                                {i18n.t('APP_VIEW_YOUR_IMMUNITY_CERTIFICATE')}
                            </Text>
                        </View>
                        {certificate
                            ? <TouchableOpacity
                                onPress={() => history.push('/qrcode/certificate')}
                                style={[commonStyles.card, { backgroundColor: colors.button, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                                <>
                                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_VIEW_IMMUNITY_CERTIFICATE')}</Text>
                                    <Entypo
                                        name="chevron-right"
                                        style={{ alignSelf: 'center' }}
                                        color={colors.text}
                                        size={24} />
                                </>
                            </TouchableOpacity>
                            : <Text style={{ fontFamily: 'Poppins-Bold', color: '#A8D18D', paddingLeft: 15, marginBottom: 15 }}>{i18n.t('APP_REQUESTED_IMMUNITY_CERTIFICATE')}</Text>}
                    </>
                    : null}
                {vaccineId
                    ? <>
                        <View style={{
                            paddingVertical: 30,
                            paddingHorizontal: 15
                        }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                                {i18n.t('APP_IMMUNITY_ID')}
                            </Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                                {i18n.t('APP_YOUR_IMMUNITY_ID')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => history.push('/qrcode/vaccine')}
                            style={[commonStyles.card, { backgroundColor: colors.button, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_VIEW_VACCINE_ID')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={colors.text}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                    </>
                    : null}
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_IMMUNITY')}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                        {i18n.t('APP_IMMUNITY_CONTEXT')}
                    </Text>
                </View>
                <View>
                    {records.length > 1
                        ? <TouchableOpacity
                            onPress={() => openURL('https://moaiapp.com/check-certificate/scan-id/app')}
                            style={[commonStyles.card, { backgroundColor: colors.button, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_REQUEST_IMMUNITY_CERTIFICATE')}</Text>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={colors.text}
                                    size={24} />
                            </>
                        </TouchableOpacity>
                        : null}
                    {records.length > 0
                        ? records.map((record, index) =>
                            <View style={[commonStyles.card, { backgroundColor: colors.button, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]} key={index}>
                                <>
                                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_IMMUNITY_TYPE')}: {immunity[Number(record.type)]}</Text>
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