import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { useHistory } from 'react-router';
import { styles } from './styles';
import i18n from 'i18n-js';


const QuestionnaireCompleted: React.FC = () => {

    const history = useHistory();

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
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 21, paddingBottom: 15 }}>
                    {i18n.t('APP_QUESTIONNAIRE_COMPLETED')}!
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                    Using our model we can determine your exposure risk level, based on the answers you provided and your risk profile. Tap the button below to learn more.
                </Text>
            </View>
            <View style={styles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/feedback/exposure')} style={[styles.homeButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_CHECK_EXPOSURE')}</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
};

export default QuestionnaireCompleted;
