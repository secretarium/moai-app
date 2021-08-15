import React from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { openURL } from 'expo-linking';
import { Entypo } from '@expo/vector-icons';
import licensesData from '../../../../public/licenses-mobile.json';
import MainLayout from '../../common/MainLayout';
import { useTheme } from '../../../hooks/useTheme';
import i18n from 'i18n-js';


const Licenses: React.FC = () => {

    const { colors } = useTheme();

    /**
     * Function to extract name and version of the package
     * @param packageName - Name of the package
     * @returns A tuple [name, version] containing name and version of the package
     */
    const getNameAndVersion = (packageName: string) => {
        let name;
        let version;
        if (packageName.split('@')[0].length < 1) {
            name = packageName.split('@')[1];
            version = packageName.split('@')[2];
        } else {
            [name, version] = packageName.split('@');
        }
        return [name, version];
    };

    /**
     * Function to iterate through the JSON containing all the dependencies
     * used to create Moai
     */
    const getLicenses = Object.keys(licensesData).map(packageName => {
        const { licenses, ...license } = licensesData[packageName];
        const [name, version] = getNameAndVersion(packageName);

        return {
            packageName,
            name,
            licenses,
            version,
            ...license
        };
    });

    return (
        <MainLayout goBackRoute={'/about'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    {i18n.t('APP_ABOUT')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 20, paddingBottom: 15 }}>
                    {i18n.t('APP_THIRD_PARTY_NOTICES')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text, paddingBottom: 20 }}>
                    {i18n.t('APP_THIRD_PARTY_LICENSES')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>
                    {i18n.t('APP_TOP_LEVEL_DEPENDENCIES')}
                </Text>
            </View>
            <FlatList
                data={getLicenses}
                renderItem={({ item }) => (
                    <View style={styles.cardShadow}>
                        <View style={[styles.card, { backgroundColor: colors.button }]}>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => item.licenseUrl && openURL(item.licenseUrl)}>
                                <View style={{ maxWidth: '90%' }}>
                                    <Text style={[styles.name, { fontFamily: 'Poppins-Bold', color: colors.text }]}>{item.name}</Text>
                                    <Text style={[styles.text, { fontFamily: 'Poppins-Regular', color: colors.text }]}>{item.licenses}</Text>
                                    <Text style={[styles.text, { fontFamily: 'Poppins-Regular', color: colors.text }]}>{item.version}</Text>
                                </View>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={colors.text}
                                    size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </MainLayout>
    );
};

export default Licenses;
