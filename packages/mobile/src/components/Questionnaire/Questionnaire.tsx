import React, { useEffect } from 'react';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { styles } from './styles';
import { RouteComponentProps, useHistory } from 'react-router';
import { withState } from '../../store';

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
                questionText: 'Welcome to the Moai questionnaire! Help us measure your exposure risk, by answering a few questions. Tap next to continue'
            },
            {
                questionType: 'SelectionGroup',
                questionText: 'How many people other than you do you estimate were present?',
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
                questionText: 'How long did you stay at the location?',
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
                questionText: 'Were people and staff wearing masks?',
                questionId: '4',
                options: [
                    { optionText: 'Yes', value: 'Yes' },
                    { optionText: 'No', value: 'No' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: 'Were people following the social distancing rules?',
                questionId: '7',
                options: [
                    { optionText: 'Yes', value: 'Yes' },
                    { optionText: 'No', value: 'No' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: 'Was additional protection put in place? (e.g. one-way systems, walled separators at tills, etc.)',
                questionId: '8',
                options: [
                    { optionText: 'Yes', value: 'Yes' },
                    { optionText: 'No', value: 'No' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: 'How many were in your party?',
                questionId: '10',
                options: [
                    { optionText: 'Just me', value: 'Just me' },
                    { optionText: '2', value: '2' },
                    { optionText: '2-4', value: '2-4' },
                    { optionText: '4+', value: '4+' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: 'Were all the members of your party from your household?',
                questionId: '11',
                options: [
                    { optionText: 'Yes', value: 'Yes' },
                    { optionText: 'No', value: 'No' }
                ]
            },
            {
                questionType: 'MultipleSelectionGroup',
                questionText: 'How was the air flow? (select all that apply)',
                questionId: '13',
                questionSettings: {
                    autoAdvance: false,
                    allowDeselection: true,
                    maxMultiSelect: 4,
                    minMultiSelect: 1
                },
                options: [
                    {
                        optionText: 'Well ventilated (doors or windows open, large inside space e.g. museums, etc.)',
                        value: 'Well ventilated (doors or windows open, large inside space e.g. museums, etc.)'
                    },
                    {
                        optionText: 'Air conditioning or heating was present and very likely to be working',
                        value: 'Air conditioning or heating was present and very likely to be working'
                    },
                    {
                        optionText: 'The air was circulating a lot',
                        value: 'The air was circulating a lot'
                    },
                    {
                        optionText: 'Confined space with no apparent ventilation',
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
                            questionText: 'What was the location type?',
                            questionId: '1',
                            options: [
                                { optionText: 'Indoor', value: 'Indoor' },
                                { optionText: 'Outdoor', value: 'Outdoor' }
                            ]
                        }
                    );
                    break;
                }
                case '26': {
                    questions.unshift(
                        {
                            questionType: 'SelectionGroup',
                            questionText: 'What was the location type?',
                            questionId: '1',
                            options: [
                                { optionText: 'Indoor', value: 'Indoor' },
                                { optionText: 'Outdoor', value: 'Outdoor' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: 'Were the surfaces cleaned after every usage?',
                            questionId: '14',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' },
                                { optionText: 'Often but not after every usage', value: 'Often but not after every usage' }
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
                            questionText: 'What was the location type?',
                            questionId: '1',
                            options: [
                                { optionText: 'Indoor', value: 'Indoor' },
                                { optionText: 'Outdoor', value: 'Outdoor' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: 'Were the surfaces cleaned after every usage?',
                            questionId: '14',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' },
                                { optionText: 'Often but not after every usage', value: 'Often but not after every usage' }
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
                            questionText: 'Were the surfaces cleaned after every usage?',
                            questionId: '14',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' },
                                { optionText: 'Often but not after every usage', value: 'Often but not after every usage' }
                            ]
                        }
                    );
                    break;
                }
                case '15': {
                    questions.push(
                        {
                            questionType: 'SelectionGroup',
                            questionText: 'Were the surfaces cleaned after every usage?',
                            questionId: '14',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' },
                                { optionText: 'Often but not after every usage', value: 'Often but not after every usage' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: 'Did any contact between members of the party occur during the gathering?',
                            questionId: '15',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' }
                            ]
                        },
                        {
                            questionType: 'SelectionGroup',
                            questionText: 'Did it involve singing or physical activities?',
                            questionId: '16',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' }
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
                            questionText: 'Were all the members from your support bubble?',
                            questionId: '12',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' }
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
                            questionText: 'Can you please describe it in a few words?',
                            questionId: '9',
                            placeholderText: 'Type your answer...'
                        });
                    }
                    break;
                }
                case '4': {
                    if (answer.value.value === 'Yes') {
                        const index = questions.findIndex(question => question.questionId === '4');
                        console.log('YES', index);
                        questions.splice(index + 1, 0, {
                            questionType: 'SelectionGroup',
                            questionText: 'Were people using the PPE correctly? (e.g. covering both the nose and mouth)',
                            questionId: '5',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' }
                            ]
                        });
                    } else if (answer.value.value === 'No') {
                        const index = questions.findIndex(question => question.questionId === '4');
                        console.log('NO', index);
                        questions.splice(index + 1, 0, {
                            questionType: 'SelectionGroup',
                            questionText: 'Was the staff wearing any form of PPE?',
                            questionId: '6',
                            options: [
                                { optionText: 'Yes', value: 'Yes' },
                                { optionText: 'No', value: 'No' }
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
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Previous</Text>
                </TouchableOpacity>
            );
        };

        const renderNextButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Next</Text>
                </TouchableOpacity>
            );
        };

        const renderFinishedButton = (onPress, enabled) => {
            return (
                <TouchableOpacity onPress={onPress} disabled={!enabled} style={[styles.navButton, { backgroundColor: themeColorStyle }]}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Finished</Text>
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
