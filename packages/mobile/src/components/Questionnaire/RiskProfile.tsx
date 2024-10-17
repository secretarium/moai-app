import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MainLayout from '../common/MainLayout';
// import { SimpleSurvey } from 'react-native-simple-survey';
import { useNavigate } from '../../react-router';
import { styles } from './styles';
import { withState } from '../../store';
import i18n from '../../services/i18n';
import { setRiskProfile } from '../../actions';
import { useTheme } from '../../hooks/useTheme';


const RiskProfile = withState()(
    null,
    ({ dispatch }) => {

        const naviguate = useNavigate();
        const { colors } = useTheme();

        const questions = [
            {
                questionType: 'Info',
                questionText: i18n.t('APP_EXPOSURE_RISK_PROFILE')
            },
            {
                questionType: 'SelectionGroup',
                questionText: `Do you have any of the following risk factors:\n
    - have had an organ transplant
    - are having chemotherapy or antibody treatment for cancer, including immunotherapy
    - are having an intense course of radiotherapy (radical radiotherapy) for lung cancer
    - are having targeted cancer treatments that can affect the immune system (such as protein kinase inhibitors or PARP inhibitors)
    - have blood or bone marrow cancer (such as leukaemia, lymphoma or myeloma)
    - have had a bone marrow or stem cell transplant in the past 6 months, or are still taking immunosuppressant medicine
    - have been told by a doctor you have a severe lung condition (such as cystic fibrosis, severe asthma or severe COPD)
    - have a condition that means they have a very high risk of getting infections (such as SCID or sickle cell)
    - are taking medicine that makes them much more likely to get infections (such as high doses of steroids or immunosuppressant medicine)
    - have a serious heart condition and are pregnant
    - are an adult with Down’s syndrome
    - are an adult who is having dialysis or has severe (stage 5) long-term kidney disease
    - have been classed as clinically extremely vulnerable, based on clinical judgement and an assessment of your needs`,
                questionId: '1',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: `Do you have any of the following risk factors:\n
    - are 70 or older
    - have a lung condition that’s not severe (such as asthma, COPD, emphysema or bronchitis)
    - have heart disease (such as heart failure)
    - have diabetes
    - have chronic kidney disease
    - have liver disease (such as hepatitis)
    - have a condition affecting the brain or nerves (such as Parkinson’s disease, motor neurone disease, multiple sclerosis or cerebral palsy)
    - have a condition that means they have a high risk of getting infections
    - are taking medicine that can affect the immune system (such as low doses of steroids)
    - are very obese (a BMI of 40 or above) 
    - are pregnant
    - smoking`,
                questionId: '2',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            }
        ];

        const onSurveyFinished = (answers) => {
            if (answers[0].value.value === '0' && answers[0].value.value === '1')
                dispatch(setRiskProfile('high'));
            else if (answers[0].value.value === '1' && answers[1].value.value === '0')
                dispatch(setRiskProfile('medium'));
            else
                dispatch(setRiskProfile('low'));
            naviguate('/immunity');
        };

        const renderPreviousButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_PREVIOUS')}</Text>
                </TouchableOpacity>
            );
        };

        const renderNextButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_NEXT')}</Text>
                </TouchableOpacity>
            );
        };

        const renderFinishedButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: colors.button }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_FINISHED')}</Text>
                </TouchableOpacity>
            );
        };

        const renderButton = (data, index, isSelected, onPress) => {
            return (
                <TouchableOpacity key={`selection_button_view_${index}`} onPress={onPress} style={[styles.optionButton, { backgroundColor: isSelected ? '#00b0ee' : '#e95c59' }]}>
                    <Text key={`button_${index}`} style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{data.optionText}</Text>
                </TouchableOpacity>
            );
        };

        const renderQuestionText = (questionText) => {
            return (
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text, fontSize: 15 }}>{questionText}</Text>
                </View>
            );
        };

        const renderInfoText = (infoText) => {
            return (
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text, fontSize: 15 }}>{infoText}</Text>
                </View>
            );
        };

        return (
            <MainLayout goBackRoute={'/'} showGoBack={true}>
                <ScrollView style={{ marginTop: 20 }}>
                    <Text>Survey not available at this time</Text>
                    {/* <SimpleSurvey
                        survey={questions}
                        renderSelector={renderButton}
                        navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                        renderPrevious={renderPreviousButton}
                        renderNext={renderNextButton}
                        renderFinished={renderFinishedButton}
                        renderQuestionText={renderQuestionText}
                        onSurveyFinished={(answers) => onSurveyFinished(answers)}
                        renderInfo={renderInfoText}
                    /> */}
                </ScrollView>
            </MainLayout>
        );
    });

export default RiskProfile;
