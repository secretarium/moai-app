import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useNavigate } from '../../react-router';
import { styles } from './styles';
import i18n from '../../services/i18n';
import { useTheme } from '../../hooks/useTheme';

const QuestionnaireCompleted: React.FC = () => {

    const naviguate = useNavigate();
    const { colors } = useTheme();

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 21, paddingBottom: 15 }}>
                    {i18n.t('APP_QUESTIONNAIRE_COMPLETED')}!
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                    {i18n.t('APP_EXPOSURE_MODEL')}
                </Text>
            </View>
            <View style={styles.homeButtonContainer} >
                <TouchableOpacity onPress={() => naviguate('/feedback/exposure')} style={[styles.homeButton, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_CHECK_EXPOSURE')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
};

export default QuestionnaireCompleted;
