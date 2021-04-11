import React from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { RouteComponentProps } from 'react-router';
import i18n from 'i18n-js';
import { withState } from '../../store';


type CertificateProps = RouteComponentProps<{
    userDigest: string;
}>;

const Certificate = withState<CertificateProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { userDigest } } = match;

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        return (
            <MainLayout goBackRoute={'/'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_IMMUNITY_CERTIFICATE')}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                        {userDigest}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default Certificate;
