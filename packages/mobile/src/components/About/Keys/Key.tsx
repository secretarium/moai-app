import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../../common/MainLayout';
import { RouteComponentProps } from 'react-router';
import { withState } from '../../../store';
import { useTheme } from '../../../hooks/useTheme';

type KeyProps = RouteComponentProps<{
    key: string;
}>;

const Key = withState<KeyProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { key } } = match;
        const { colors } = useTheme();

        return (
            <MainLayout goBackRoute={'/keys'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                        Public Key
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                        {key}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default Key;
