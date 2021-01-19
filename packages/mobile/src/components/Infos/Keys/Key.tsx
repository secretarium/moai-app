import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../../common/MainLayout';
import { useColorScheme } from 'react-native-appearance';
import { RouteComponentProps } from 'react-router';
import { withState } from '../../../store';

type KeyProps = RouteComponentProps<{
    key: string;
}>;

const Key = withState<KeyProps>()(
    () => ({}),
    ({ match }) => {

        const { params: { key } } = match;

        // Color theme
        const colorScheme = useColorScheme();
        const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

        return (
            <MainLayout goBackRoute={'/keys'} showGoBack={true}>
                <View style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15
                }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                        Public Key
                    </Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                        {key}
                    </Text>
                </View>
            </MainLayout>
        );
    });

export default Key;
