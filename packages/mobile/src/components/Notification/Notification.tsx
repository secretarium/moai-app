import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useNavigate, useParams } from '../../react-router';
import i18n from '../../services/i18n';
import { withState } from '../../store';
import { commonStyles } from '../commonStyles';
import { useTheme } from '../../hooks/useTheme';

type NotificationProps = {
    /**
     * Notification message in a stringified JSON form
     */
    notificationMessage: string;
};

const Notification = withState()(
    null,
    () => {

        const { notificationMessage } = useParams() as NotificationProps;
        const naviguate = useNavigate();
        const [notifContent, setNotifContent] = useState();
        const [notifObject, setNotifObject] = useState(JSON.parse(notificationMessage));
        const { colors } = useTheme();

        useEffect(() => {
            if (notificationMessage) {
                const notifObj = JSON.parse(notificationMessage);
                setNotifObject(notifObj);
                setNotifContent(notifObj.type);
            }
        }, [notificationMessage]);

        /**
         * Function to render notification content based on the type of the notification
         * @returns A screen with the notification content
         */
        const renderNotification = () => {
            switch (notifContent) {
                case 'feedbackInvitation':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{i18n.t('APP_FEEDBACK_INVITATION')}</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => notifObject.feedbackToken
                                ? naviguate(`/feedback/form/exposure/${notifObject.feedbackToken}/${notifObject.testId}`)
                                : naviguate('/feedback/form')} style={[commonStyles.homeButton, { backgroundColor: colors.button, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_YES')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => naviguate('/')} style={[commonStyles.homeButton, { backgroundColor: colors.button }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_NO')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                case 'newImmunityRecord':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{i18n.t('APP_NEW_IMMUNITY_RECORD')}</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => naviguate('/immunity')} style={[commonStyles.homeButton, { backgroundColor: colors.button, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_CHECK_IMMUNITY_RECORDS')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                case 'immunityCertificateRequestApproved':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{i18n.t('APP_IMMUNITY_RECORD_APPROVED')}</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => naviguate('/immunity')} style={[commonStyles.homeButton, { backgroundColor: colors.button, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_CHECK_IMMUNITY_RECORDS')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                case 'immunityCertificateRequestRejected':
                    return <>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{i18n.t('APP_IMMUNITY_RECORD_REJECTED')}</Text>
                        <View style={[commonStyles.homeButtonContainer, { marginTop: 80 }]} >
                            <TouchableOpacity onPress={() => naviguate('/')} style={[commonStyles.homeButton, { backgroundColor: colors.button, marginBottom: 15 }]}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text }}>{i18n.t('APP_GO_HOME')}</Text>
                            </TouchableOpacity>
                        </View>
                    </>;
                default:
                    return <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{notificationMessage}</Text>;
            }
        };

        return (
            <MainLayout goBackRoute={'/'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_NOTIFICATION_ALERT')}
                    </Text>
                    {renderNotification()}
                </View>
            </MainLayout>
        );
    });

export default Notification;
