import React, { useState } from 'react';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const Questionnaire: React.FC = () => {

    const questions = [
        {
            question: 'What was the location type?',
            options: [
                { label: 'Indoor', value: 'Indoor' },
                { label: 'Outdoor', value: 'Outdoor' }
            ]
        },
        {
            question: 'How many people other than you do you estimate were present?',
            options: [
                { label: '0', value: '0' },
                { label: '1-5', value: '1-5' },
                { label: '5-10', value: '5-10' },
                { label: '11+', value: '11+' }
            ]
        },
        {
            question: 'How long did you stay at the location?',
            options: [
                { label: '5', value: '5' },
                { label: '10', value: '10' },
                { label: '15', value: '15' },
                { label: '20', value: '20' },
                { label: '30', value: '30' },
                { label: '45', value: '45' },
                { label: '1h', value: '1h' },
                { label: '2h', value: '2h' },
                { label: '2h+', value: '2h+' }
            ]
        },
        {
            question: 'Where people and staff wearing masks?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        },
        {
            question: 'Were people following the social distancing rules?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        },
        {
            question: 'Was additional protection put in place? (e.g. one-way systems, walled separators at tills, etc.)',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        },
        {
            question: 'How many were in your party?',
            options: [
                { label: 'Just me', value: 'Just me' },
                { label: '2', value: '2' },
                { label: '2-4', value: '2-4' },
                { label: '4+', value: '4+' }
            ]
        },
        {
            question: 'Were all the members of your party from your household?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        },
        {
            question: 'Were all the members from your support bubble?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        },
        {
            question: 'How was the air flow? (select all that apply)',
            options: [
                {
                    label: 'Well ventilated (doors or windows open, large inside space e.g. museums, etc.)',
                    value: 'Well ventilated (doors or windows open, large inside space e.g. museums, etc.)'
                },
                {
                    label: 'Air conditioning or heating was present and very likely to be working',
                    value: 'Air conditioning or heating was present and very likely to be working'
                },
                {
                    label: 'The air was circulating a lot',
                    value: 'The air was circulating a lot'
                },
                {
                    label: 'Confined space with no apparent ventilation',
                    value: 'Confined space with no apparent ventilation'
                }
            ]
        },
        {
            question: 'Were the surfaces cleaned after every usage?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
                { label: 'Often but not after every usage', value: 'Often but not after every usage' }
            ]
        },
        {
            question: 'Did any contact between members of the party occur during the gathering?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        },
        {
            question: 'Did it involve singing or physical activities?',
            options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' }
            ]
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState<number>(9);
    const [currentAnswer, setCurrentAnswer] = useState<string>();

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const themeInputStyle = colorScheme !== 'dark' ? '#ffffff' : '#1b1b1b';


    return (
        <MainLayout showGoBack={true}>
            <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                Questionnaire
            </Text>
            <View>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>
                    {questions[currentQuestion].question}
                </Text>
                <RadioForm
                    animation={true}
                >
                    {
                        questions[currentQuestion].options.map((obj, i) => (
                            <RadioButton key={i}>
                                <RadioButtonInput
                                    isSelected={currentAnswer === obj.value}
                                    obj={obj}
                                    index={i}
                                    onPress={(value) => setCurrentAnswer(value)}
                                    borderWidth={2}
                                    buttonInnerColor={'#e95c59'}
                                    buttonOuterColor={'#e95c59'}
                                    buttonWrapStyle={{ marginLeft: 15 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    onPress={(value) => setCurrentAnswer(value)}
                                    labelStyle={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: themeTextStyle }}
                                    labelWrapStyle={{ marginLeft: 10 }}
                                />
                            </RadioButton>
                        ))
                    }
                </RadioForm>
            </View>
        </MainLayout>
    );
};

export default Questionnaire;
