import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { withState } from '../../store';
import MainLayout from '../common/MainLayout';
import { useNavigate } from '../../react-router';
import { Entypo } from '@expo/vector-icons';
import { commonStyles } from './styles';
import i18n from '../../services/i18n';
import { getVaccineCode } from '../../actions';
import { useTheme } from '../../hooks/useTheme';

const Setup = withState()(
    null,
    ({ dispatch }) => {

        const naviguate = useNavigate();
        const { colors } = useTheme();

        const handleGetVaccineCode = () => {
            dispatch(getVaccineCode());
            naviguate('/qrcode/vaccine');
        };

        return (
            <MainLayout goBackRoute={'/immunity'} showGoBack={true}>
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
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => naviguate('/feedback/riskProfile')}
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
                </ScrollView>
            </MainLayout>
        );
    });

export default Setup;