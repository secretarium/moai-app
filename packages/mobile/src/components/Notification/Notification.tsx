import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { RouteComponentProps } from 'react-router';
import i18n from 'i18n-js';
import { withState } from '../../store';


type NotificationProps = RouteComponentProps<{
    notificationMessage: string;
}>;

const Notification = withState<NotificationProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { notificationMessage } } = match;

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        useEffect(() => {
            console.log(notificationMessage);
        }, [notificationMessage]);

        return (
            <MainLayout goBackRoute={'/'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_NOTIFICATION_ALERT')}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                        {notificationMessage}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default Notification;
