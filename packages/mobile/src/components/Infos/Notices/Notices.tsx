import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import MainLayout from '../../common/MainLayout/index';


const Notices: React.FC = () => {
    const [disclaimer, setDisclaimer] = useState<string>();

    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';

    useEffect(() => {
        fetch('../../../../public/disclaimer.txt')
            .then((result) => result.text())
            .then(text => setDisclaimer(text))
            .catch(() => setDisclaimer('An error occured'));
    });

    return (
        <MainLayout showGoBack={true} withNavigation={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    External Licenses
                </Text>
                <Text>{disclaimer}</Text>
            </View>
        </MainLayout>
    );
};

export default Notices;
