import React, { useEffect, useState } from 'react';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { TouchableOpacity, Text, TextInput, View, ScrollView } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { styles } from './styles';
import { useHistory, RouteComponentProps } from 'react-router';
import i18n from 'i18n-js';
import { getExposureRisk } from '../../actions';
import { withState } from '../../store';

type QuestionnaireProps = RouteComponentProps<{
    venueType: string;
}>;

const Questionnaire = withState<QuestionnaireProps>()((s) => ({
    venues: s.exposure.venues
}), ({ match, dispatch }) => {

    const { params: { venueType } } = match;

    let questions;

    if (venueType) {
        questions = [
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
                    { optionText: '1-5', value: '1' },
                    { optionText: '5-10', value: '2' },
                    { optionText: '11+', value: '3' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q3'),
                questionId: '3',
                options: [
                    { optionText: '5min', value: '0' },
                    { optionText: '10min', value: '1' },
                    { optionText: '15min', value: '2' },
                    { optionText: '20min', value: '3' },
                    { optionText: '30min', value: '4' },
                    { optionText: '45min', value: '5' },
                    { optionText: '1h', value: '6' },
                    { optionText: '2h', value: '7' },
                    { optionText: '2h+', value: '8' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q4'),
                questionId: '4',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q7'),
                questionId: '7',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q8'),
                questionId: '8',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q10'),
                questionId: '9',
                options: [
                    { optionText: i18n.t('APP_JUST_ME'), value: '0' },
                    { optionText: '2', value: '1' },
                    { optionText: '2-4', value: '2' },
                    { optionText: '4+', value: '3' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q11'),
                questionId: '10',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13'),
                questionId: '12',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A3'),
                        value: '2'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A4'),
                        value: '3'
                    }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17'),
                questionId: '13',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17_A3'),
                        value: '2'
                    }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18'),
                questionId: '14',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18_A3'),
                        value: '2'
                    }
                ]
            }
        ];
    } else {
        questions = [
            {
                questionType: 'Info',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_WELCOME')
            },
            {

                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q19'),
                questionId: '21',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20'),
                questionId: '0',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A3'),
                        value: '2'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A4'),
                        value: '3'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A5'),
                        value: '4'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A6'),
                        value: '5'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A7'),
                        value: '6'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A8'),
                        value: '7'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A9'),
                        value: '8'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A10'),
                        value: '9'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A11'),
                        value: '10'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A12'),
                        value: '11'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A13'),
                        value: '12'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A14'),
                        value: '13'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A15'),
                        value: '14'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A16'),
                        value: '15'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A17'),
                        value: '16'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A18'),
                        value: '17'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q20_A19'),
                        value: '18'
                    }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q2'),
                questionId: '2',
                options: [
                    { optionText: '0', value: '0' },
                    { optionText: '1-5', value: '1' },
                    { optionText: '5-10', value: '2' },
                    { optionText: '11+', value: '3' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q3'),
                questionId: '3',
                options: [
                    { optionText: '5min', value: '0' },
                    { optionText: '10min', value: '1' },
                    { optionText: '15min', value: '2' },
                    { optionText: '20min', value: '3' },
                    { optionText: '30min', value: '4' },
                    { optionText: '45min', value: '5' },
                    { optionText: '1h', value: '6' },
                    { optionText: '2h', value: '7' },
                    { optionText: '2h+', value: '8' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q4'),
                questionId: '4',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q7'),
                questionId: '7',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q8'),
                questionId: '8',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q10'),
                questionId: '9',
                options: [
                    { optionText: i18n.t('APP_JUST_ME'), value: '0' },
                    { optionText: '2', value: '1' },
                    { optionText: '2-4', value: '2' },
                    { optionText: '4+', value: '3' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q11'),
                questionId: '10',
                options: [
                    { optionText: i18n.t('APP_YES'), value: '0' },
                    { optionText: i18n.t('APP_NO'), value: '1' }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13'),
                questionId: '12',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A3'),
                        value: '2'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q13_A4'),
                        value: '3'
                    }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17'),
                questionId: '13',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q17_A3'),
                        value: '2'
                    }
                ]
            },
            {
                questionType: 'SelectionGroup',
                questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18'),
                questionId: '14',
                options: [
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18_A1'),
                        value: '0'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18_A2'),
                        value: '1'
                    },
                    {
                        optionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q18_A3'),
                        value: '2'
                    }
                ]
            }
        ];
    }

    const history = useHistory();
    const [venue, setVenue] = useState<string>();
    const [finalAnswers] = useState([]);

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    useEffect(() => {
        if (venueType) {
            setVenue(venueType);
        }
    }, []);

    useEffect(() => {
        switch (venue) {
            case '6':
            case '12':
            case '18': {
                questions.push(
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q1'),
                        questionId: '1',
                        options: [
                            { optionText: i18n.t('APP_INDOOR'), value: '0' },
                            { optionText: i18n.t('APP_OUTDOOR'), value: '1' }
                        ]
                    }
                );
                break;
            }
            case '14': {
                questions.push(
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q1'),
                        questionId: '1',
                        options: [
                            { optionText: i18n.t('APP_INDOOR'), value: '0' },
                            { optionText: i18n.t('APP_OUTDOOR'), value: '1' }
                        ]
                    },
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                        questionId: '15',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' },
                            { optionText: i18n.t('APP_OFTEN'), value: '2' }
                        ]
                    }
                );

                const index = questions.findIndex(question => question.questionId === '4');
                questions.splice(index, 1);
                break;
            }
            case '16': {
                questions.push(
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q1'),
                        questionId: '1',
                        options: [
                            { optionText: i18n.t('APP_INDOOR'), value: '0' },
                            { optionText: i18n.t('APP_OUTDOOR'), value: '1' }
                        ]
                    },
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                        questionId: '15',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' },
                            { optionText: i18n.t('APP_OFTEN'), value: '2' }
                        ]
                    }
                );
                break;
            }
            case '0':
            case '4':
            case '7':
            case '9':
            case '17': {
                questions.push(
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                        questionId: '15',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' },
                            { optionText: i18n.t('APP_OFTEN'), value: '2' }
                        ]
                    }
                );
                break;
            }
            case '3': {
                questions.push(
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q14'),
                        questionId: '15',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' },
                            { optionText: i18n.t('APP_OFTEN'), value: '2' }
                        ]
                    },
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q15'),
                        questionId: '16',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' }
                        ]
                    },
                    {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q16'),
                        questionId: '17',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' }
                        ]
                    }
                );
                break;
            }
            default:
                break;
        }
    }, [venue]);

    const onSurveyFinished = (answers) => {
        for (let i = 1; i < 18; i++) {
            if (answers.some(answer => Number(answer.questionId) === i)) {
                const index = answers.findIndex(answer => Number(answer.questionId) === i);
                finalAnswers.push(Number(answers[index].value.value));
            } else {
                finalAnswers.push(10);
            }
        }

        if (venue) {
            finalAnswers.unshift(Number(venue));
            dispatch(getExposureRisk(finalAnswers));
            history.push('/feedback/completed');
            //console.log('RESULTS', finalAnswers);
        } else {
            history.push('/home');
            //console.log('RESULTS', finalAnswers);
        }
    };

    const onAnswerSubmitted = (answer) => {
        switch (answer.questionId) {
            case '10': {
                if (answer.value.value === '1') {
                    const index = questions.findIndex(question => question.questionId === '10');
                    questions.splice(index + 1, 0, {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q12'),
                        questionId: '11',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' }
                        ]
                    });
                }
                break;
            }
            case '8': {
                if (answer.value.value === '0') {
                    const index = questions.findIndex(question => question.questionId === '8');
                    questions.splice(index + 1, 0, {
                        questionType: 'TextInput',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q9'),
                        questionId: '22',
                        placeholderText: `${i18n.t('APP_TYPE_ANSWER')}...`
                    });
                }
                break;
            }
            case '4': {
                if (answer.value.value === '0') {
                    const index = questions.findIndex(question => question.questionId === '4');
                    questions.splice(index + 1, 0, {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q5'),
                        questionId: '5',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' }
                        ]
                    });
                } else if (answer.value.value === '1') {
                    const index = questions.findIndex(question => question.questionId === '4');
                    questions.splice(index + 1, 0, {
                        questionType: 'SelectionGroup',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_Q6'),
                        questionId: '6',
                        options: [
                            { optionText: i18n.t('APP_YES'), value: '0' },
                            { optionText: i18n.t('APP_NO'), value: '1' }
                        ]
                    });
                }
                break;
            }
            case '21': {
                if (answer.value.value === '1') {
                    const index = questions.findIndex(question => question.questionId === '21');
                    questions.splice(index + 1, 0, {
                        questionType: 'Info',
                        questionText: i18n.t('APP_EXPOSURE_QUESTIONNAIRE_UNKNOWN_VENUE')
                    });
                    questions.length = 3;
                }
                break;
            }
            case '0': {
                setVenue(answer.value.value);
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
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>{venue ? i18n.t('APP_FINISHED') : i18n.t('APP_GO_HOME')}</Text>
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
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <ScrollView>
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
            </ScrollView>
        </MainLayout>
    );
});

export default Questionnaire;
