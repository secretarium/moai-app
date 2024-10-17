import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../../common/MainLayout';
import { withState } from '../../../store';
import { useTheme } from '../../../hooks/useTheme';
import i18n from '../../../services/i18n';
import { useParams } from '../../../react-router';

type KeyProps = {
    key: string;
};

const Key = withState()(
    null,
    () => {

        const { key } = useParams() as KeyProps;
        const { colors } = useTheme();

        return (
            <MainLayout goBackRoute={'/keys'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                        {i18n.t('APP_PUBLIC_KEY')}
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                        {key}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default Key;
