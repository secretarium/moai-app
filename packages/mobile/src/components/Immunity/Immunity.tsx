import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { Entypo } from '@expo/vector-icons';
import { openURL } from 'expo-linking';
import { commonStyles } from './styles';
import i18n from 'i18n-js';


const Immunity= withState()((s) => ({
    records: s.immunity.immunityRecords,
    certificate: s.immunity.immunityCertificate
}), ({ records, certificate, dispatch }) => {

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

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
                <TouchableOpacity
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
            </ScrollView>
        </MainLayout>
    );
});

export default Immunity;