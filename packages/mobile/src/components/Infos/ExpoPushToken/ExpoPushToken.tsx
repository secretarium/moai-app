import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { withState } from '../../../store';


const ExpoPushToken = withState()(
    (s) => ({
        expoPushToken: s.system.expoPushToken
    }),
    ({ expoPushToken }) => {

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        return (
            <MainLayout goBackRoute={'/infos'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        Expo Push Notification Token
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                        {expoPushToken}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default ExpoPushToken;