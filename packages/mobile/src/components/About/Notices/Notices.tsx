import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { View, Text, ScrollView } from 'react-native';
import MainLayout from '../../common/MainLayout/index';
import disclaimerPath from '../../../../public/disclaimer.txt';
import { useTheme } from '../../../hooks/useTheme';


const Notices: React.FC = () => {

    const [disclaimer, setDisclaimer] = useState<string>();
    const { colors } = useTheme();

    useEffect(() => {
        const fetchDisclaimer = async () => {
            try {
                const disclaimerFile = Asset.fromModule(disclaimerPath);
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
        <MainLayout goBackRoute={'/about'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    External Licenses
                </Text>
                <ScrollView>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{disclaimer}</Text>
                </ScrollView>
            </View>
        </MainLayout>
    );
};

export default Notices;
