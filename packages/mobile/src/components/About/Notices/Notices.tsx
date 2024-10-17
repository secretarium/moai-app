import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { View, Text, ScrollView } from 'react-native';
import MainLayout from '../../common/MainLayout/index';
import { useTheme } from '../../../hooks/useTheme';
import i18n from '../../../services/i18n';


const Notices: React.FC = () => {

    const [disclaimer, setDisclaimer] = useState<string>();
    const { colors } = useTheme();

    useEffect(() => {
        const fetchDisclaimer = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const disclaimerFile = Asset.fromModule(require('../../../../public/disclaimer.txt'));
                // await disclaimerFile.downloadAsync();
                const data = await FileSystem.readAsStringAsync(disclaimerFile.localUri);
                setDisclaimer(data);
            } catch (error) {
                setDisclaimer(i18n.t('APP_ERROR_LOADING_LICENSES'));
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
                    {i18n.t('APP_EXTERNAL_LICENSES')}
                </Text>
                <ScrollView>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>{disclaimer}</Text>
                </ScrollView>
            </View>
        </MainLayout>
    );
};

export default Notices;
