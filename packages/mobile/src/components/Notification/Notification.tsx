import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { RouteComponentProps } from 'react-router';
import i18n from 'i18n-js';
import { withState } from '../../store';
import { useHistory } from 'react-router';
import { commonStyles } from '../commonStyles';

type NotificationProps = RouteComponentProps<{
    notificationMessage: string;
}>;

const Notification = withState<NotificationProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { notificationMessage } } = match;
        const history = useHistory();
        const [notifContent, setNotifContent] = useState();
        const [notifObject, setNotifObject] = useState(JSON.parse(notificationMessage));

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
        const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';

        useEffect(() => {
            if (notificationMessage) {
                const notifObj = JSON.parse(notificationMessage);
                setNotifObject(notifObj);
                setNotifContent(notifObj.type);
            }
        }, [notificationMessage]);

        const renderNotification = () => {
            switch (notifContent) {
                case 'feedbackInvitation':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>Would you like to answer a few questions to learn more about your exposure?</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => notifObject.feedbackToken
                                ? history.push(`/feedback/form/exposure/${notifObject.feedbackToken}/${notifObject.testId}`)
                                : history.push('/feedback/form')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                case 'newImmunityRecord':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>Your immunity record has been updated!</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => history.push('/immunity')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Check Immunity Records</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                case 'immunityCertificateRequestApproved':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>Your request for an immunity certificate has been approved! You can view it in your Immunity Records.</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => history.push('/immunity')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Check Immunity Records</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                case 'immunityCertificateRequestRejected':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>Sorry, your request for an immunity certificate has been rejected.</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => history.push('/')} style={[commonStyles.homeButton, { backgroundColor: themeColorStyle, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle }}>Go home</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                default:
                    return <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>{notificationMessage}</Text>;
            }
        };

        return (
            <MainLayout goBackRoute={'/'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_NOTIFICATION_ALERT')}
                    </Text>
                    {renderNotification()}
                </View>
            </MainLayout>
        );
    });

export default Notification;
