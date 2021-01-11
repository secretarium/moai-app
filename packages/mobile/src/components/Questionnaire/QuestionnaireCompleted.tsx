import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { useHistory } from 'react-router';
import { styles } from './styles';


const QuestionnaireCompleted: React.FC = () => {

    const history = useHistory();

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    return (
        <MainLayout showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 21, paddingBottom: 15 }}>
                    Thank you for completing the questionnaire!
                </Text>
            </View>
            <View style={styles.homeButtonContainer} >
                <TouchableOpacity onPress={() => history.push('/')} style={[styles.homeButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Go home</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
};

export default QuestionnaireCompleted;
