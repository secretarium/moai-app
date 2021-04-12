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
import { requestImmunityCertificate, getImmunityCertificate } from '../../actions';

type ImmunityProps = RouteComponentProps<{
    userDigest: string;
}>;

const Immunity = withState<ImmunityProps>()((s) => ({
    records: s.immunity.immunityRecords,
    certificate: s.immunity.immunityCertificate,
    requested: s.system.certificateRequested
}), ({ records, certificate, requested, match, dispatch }) => {

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
    }, []);

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
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
            <ScrollView>
                {certificate
                    ? <TouchableOpacity
                        onPress={() => history.push('/certificate')}
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
                    : <TouchableOpacity
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
                    </TouchableOpacity>}
                {requested
                    ? <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle, paddingLeft: 15 }}>Waiting for immunity certificate. Please check again another time. Thank you</Text>
                    : null}
            </ScrollView>
        </MainLayout>
    );
});

export default Immunity;