import React, { useEffect } from 'react';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { styles } from './styles';
import { RouteComponentProps, useHistory } from 'react-router';
import { withState } from '../../store';
import i18n from 'i18n-js';


type QuestionnaireProps = RouteComponentProps<{
    venueType: string;
}>;

const Questionnaire = withState<QuestionnaireProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { venueType } } = match;

        const questions = [
            {
                questionType: 'Info',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_WELCOME')
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q2'),
                questionId: '2',
                options: [
                    { optionText: '0', value: '0' },
                    { optionText: '1-5', value: '1-5' },
                    { optionText: '5-10', value: '5-10' },
                    { optionText: '11+', value: '11+' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q3'),
                questionId: '3',
                options: [
                    { optionText: '5min', value: '5min' },
                    { optionText: '10min', value: '10min' },
                    { optionText: '15min', value: '15min' },
                    { optionText: '20min', value: '20min' },
                    { optionText: '30min', value: '30min' },
                    { optionText: '45min', value: '45min' },
                    { optionText: '1h', value: '1h' },
                    { optionText: '2h', value: '2h' },
                    { optionText: '2h+', value: '2h+' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q4'),
                questionId: '4',
                options: [
                    { optionText: i18n.t('APP_YES'), value: 'Yes' },
                    { optionText: i18n.t('APP_NO'), value: 'No' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q7'),
                questionId: '7',
                options: [
                    { optionText: i18n.t('APP_YES'), value: 'Yes' },
                    { optionText: i18n.t('APP_NO'), value: 'No' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q8'),
                questionId: '8',
                options: [
                    { optionText: i18n.t('APP_YES'), value: 'Yes' },
                    { optionText: i18n.t('APP_NO'), value: 'No' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q10'),
                questionId: '10',
                options: [
                    { optionText: i18n.t('APP_JUST_ME'), value: 'Just me' },
                    { optionText: '2', value: '2' },
                    { optionText: '2-4', value: '2-4' },
                    { optionText: '4+', value: '4+' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q11'),
                questionId: '11',
                options: [
                    { optionText: i18n.t('APP_YES'), value: 'Yes' },
                    { optionText: i18n.t('APP_NO'), value: 'No' }
                ]
            },
            {
                questionType: 'MultipleSelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13'),
                questionId: '13',
                questionSettings: {
                    autoAdvance: false,
                    allowDeselection: true,
                    maxMultiSelect: 4,
                    minMultiSelect: 1
                },
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A1'),
                        value: 'Well ventilated (doors or windows open, large inside space e.g. museums, etc.)'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A2'),
                        value: 'Air conditioning or heating was present and very likely to be working'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A3'),
                        value: 'The air was circulating a lot'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A4'),
                        value: 'Confined space with no apparent ventilation'
                    }
                ]
            }
        ];

        const history = useHistory();

        // Color theme
        const colorScheme = useColorScheme();
        const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        useEffect(() => {
            switch (venueType) {
                case '18':
                case '24':
                case '30': {
                    questions.unshift(
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q1'),
                            questionId: '1',
                            options: [
                                { optionText: i18n.t('APP_INDOOR'), value: 'Indoor' },
                                { optionText: i18n.t('APP_OUTDOOR'), value: 'Outdoor' }
                            ]
                        }
                    );
                    break;
                }
                case '26': {
                    questions.unshift(
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q1'),
                            questionId: '1',
                            options: [
                                { optionText: i18n.t('APP_INDOOR'), value: 'Indoor' },
                                { optionText: i18n.t('APP_OUTDOOR'), value: 'Outdoor' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                            questionId: '14',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' },
                                { optionText: i18n.t('APP_OFTEN'), value: 'Often but not after every usage' }
                            ]
                        }
                    );

                    const index = questions.findIndex(question => question.questionId === '4');
                    questions.splice(index, 1);
                    break;
                }
                case '28': {
                    questions.unshift(
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q1'),
                            questionId: '1',
                            options: [
                                { optionText: i18n.t('APP_INDOOR'), value: 'Indoor' },
                                { optionText: i18n.t('APP_OUTDOOR'), value: 'Outdoor' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                            questionId: '14',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' },
                                { optionText: i18n.t('APP_OFTEN'), value: 'Often but not after every usage' }
                            ]
                        }
                    );
                    break;
                }
                case '12':
                case '16':
                case '19':
                case '21':
                case '29': {
                    questions.push(
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                            questionId: '14',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' },
                                { optionText: i18n.t('APP_OFTEN'), value: 'Often but not after every usage' }
                            ]
                        }
                    );
                    break;
                }
                case '15': {
                    questions.push(
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                            questionId: '14',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' },
                                { optionText: i18n.t('APP_OFTEN'), value: 'Often but not after every usage' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q15'),
                            questionId: '15',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q16'),
                            questionId: '16',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' }
                            ]
                        }
                    );
                    break;
                }
                default:
                    break;
            }
        }, [venueType]);

        const onSurveyFinished = (answers) => {
            const infoQuestionsRemoved = [...answers];

            const answersAsObj = {};
            for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
            history.push('/questionnaireCompleted');
            console.log(answersAsObj);
        };

        const onAnswerSubmitted = (answer) => {
            switch (answer.questionId) {
                case '11': {
                    if (answer.value.value === 'No') {
                        const index = questions.findIndex(question => question.questionId === '11');
                        questions.splice(index + 1, 0, {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q12'),
                            questionId: '12',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' }
                            ]
                        });
                    }
                    break;
                }
                case '8': {
                    if (answer.value.value === 'Yes') {
                        const index = questions.findIndex(question => question.questionId === '8');
                        questions.splice(index + 1, 0, {
                            questionType: 'TextInput',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q9'),
                            questionId: '9',
                            placeholderText: `${i18n.t('APP_TYPE_ANSWER')}...`
                        });
                    }
                    break;
                }
                case '4': {
                    if (answer.value.value === 'Yes') {
                        const index = questions.findIndex(question => question.questionId === '4');
                        questions.splice(index + 1, 0, {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q5'),
                            questionId: '5',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' }
                            ]
                        });
                    } else if (answer.value.value === 'No') {
                        const index = questions.findIndex(question => question.questionId === '4');
                        questions.splice(index + 1, 0, {
                            questionType: 'SelectionGroup',
                            questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q6'),
                            questionId: '6',
                            options: [
                                { optionText: i18n.t('APP_YES'), value: 'Yes' },
                                { optionText: i18n.t('APP_NO'), value: 'No' }
                            ]
                        });
                    }
                    break;
                }
                default:
                    break;
            }
        };

        const renderPreviousButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_PREVIOUS')}</Text>
                </TouchableOpacity>
            );
        };

        const renderNextButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_NEXT')}</Text>
                </TouchableOpacity>
            );
        };

        const renderFinishedButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{i18n.t('APP_FINISHED')}</Text>
                </TouchableOpacity>
            );
        };

        const renderButton = (data, index, isSelected, onPress) => {
            return (
                <TouchableOpacity key={`selection_button_view_${index}`} onPress={onPress} style={[styles.optionButton, { backgroundColor: isSelected ? '#00b0ee' : '#e95c59' }]}>
                    <Text key={`button_${index}`} style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{data.optionText}</Text>
                </TouchableOpacity>
            );
        };

        const renderQuestionText = (questionText) => {
            return (
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{questionText}</Text>
                </View>
            );
        };

        const renderInfoText = (infoText) => {
            return (
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{infoText}</Text>
                </View>
            );
        };

        const renderTextBox = (onChange, value, placeholder, onBlur) => {
            return (
                <View style={styles.textBox}>
                    <TextInput
                        onChangeText={text => onChange(text)}
                        numberOfLines={1}
                        underlineColorAndroid={'white'}
                        placeholder={placeholder}
                        placeholderTextColor={'rgba(184,184,184,1)'}
                        value={value}
                        multiline
                        onBlur={onBlur}
                        blurOnSubmit
                        returnKeyType='done'
                    />
                </View>
            );
        };

        return (
            <MainLayout goBackRoute={'/venues'} showGoBack={true}>
                <SimpleSurvey
                    survey={questions}
                    renderSelector={renderButton}
                    navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
                    renderPrevious={renderPreviousButton}
                    renderNext={renderNextButton}
                    renderFinished={renderFinishedButton}
                    renderQuestionText={renderQuestionText}
                    onSurveyFinished={(answers) => onSurveyFinished(answers)}
                    onAnswerSubmitted={(answer) => onAnswerSubmitted(answer)}
                    renderInfo={renderInfoText}
                    renderTextInput={renderTextBox}
                />
            </MainLayout>
        );
    });

export default Questionnaire;
