import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import MainLayout from '../../common/MainLayout/index';


const Notices: React.FC = () => {
    const [disclaimer, setDisclaimer] = useState<string>();

    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';

    useEffect(() => {
        const fetchDisclaimer = async () => {
            try {
                const disclaimerFile = Asset.fromModule(require('../../../../public/disclaimer.txt'));
                await disclaimerFile.downloadAsync();
                const data = await FileSystem.readAsStringAsync(disclaimerFile.localUri);
                setDisclaimer(data);
            } catch (error) {
                console.error(error);
                setDisclaimer('Sorry, an error occured loading the disclaimer');
            }
        };
        fetchDisclaimer();
    }, []);

    return (
        <MainLayout goBackRoute={'/infos'} showGoBack={true} withNavigation={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    External Licenses
                </Text>
                <ScrollView>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>{disclaimer}</Text>
                </ScrollView>
            </View>
        </MainLayout>
    );
};

export default Notices;
