import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import MainLayout from '../../common/MainLayout/index';


const Keys: React.FC = () => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    return (
        <MainLayout goBackRoute={'/infos'} showGoBack={true} withNavigation={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    Public Keys
                </Text>
            </View>
        </MainLayout>
    );
};

export default Keys;
