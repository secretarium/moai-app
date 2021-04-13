import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { useHistory } from 'react-router';
import { Entypo } from '@expo/vector-icons';
import { commonStyles } from './styles';
import i18n from 'i18n-js';
import { getVaccineCode } from '../../actions';

const Setup = withState()(
    null,
    ({ dispatch }) => {

        const history = useHistory();

        // Color theme
        const colorScheme = useColorScheme();
        const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        const handleGetVaccineCode = () => {
            dispatch(getVaccineCode());
            history.push('/qrcode/vaccine');
        };

        return (
            <MainLayout goBackRoute={'/immunity'} showGoBack={true}>
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
                <ScrollView>
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
                </ScrollView>
            </MainLayout>
        );
    });

export default Setup;