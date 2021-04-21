import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../../common/MainLayout';
import { withState } from '../../../store';
import { useTheme } from '../../../hooks/useTheme';


const ExpoPushToken = withState()(
    (s) => ({
        expoPushToken: s.system.expoPushToken
    }),
    ({ expoPushToken }) => {

        const { colors } = useTheme();

        return (
            <MainLayout goBackRoute={'/about'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                        Expo Push Notification Token
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                        {expoPushToken}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default ExpoPushToken;