import React from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styles from './styles';
import { openURL } from 'expo-linking';
import { Entypo } from '@expo/vector-icons';
import licensesData from '../../../public/licenses-mobile.json';
import MainLayout from '../../components/common/MainLayout';
import { version as packageVersion } from '../../../package.json';

const Licenses: React.FC = () => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#404040';
    const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'black' : 'white';

    const getNameAndVersion = (key) => {
        let name;
        let version;
        if (key.split('@')[0].length < 1) {
            name = key.split('@')[1];
            version = key.split('@')[2];
        } else {
            [name, version] = key.split('@');
        }
        return [name, version];
    };

    const getLicenses = Object.keys(licensesData).map(key => {
        const { licenses, ...license } = licensesData[key];
        const [name, version] = getNameAndVersion(key);

        return {
            key,
            name,
            licenses,
            version,
            ...license
        };
    });

    return (
        <MainLayout showGoBack={true} withNavigation={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    About Moai
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle, fontSize: 20, paddingBottom: 15 }}>
                    v{packageVersion}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 20, paddingBottom: 15 }}>
                    Third-Party Notice &amp; Credits
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle, paddingBottom: 20 }}>
                    Moai incroporates components from the projects listed below. The original copyright notices and the licenses under which Secretarium Ltd. received such components are set forth below for informational purposes. Secretarium Ltd. reserves all rights not expressly granted herein, whether by implication, estoppel or otherwise.
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>
                    List of top-level dependencies
                </Text>
            </View>
            <FlatList
                data={getLicenses}
                renderItem={({ item }) => (
                    <View style={styles.cardShadow}>
                        <View style={[styles.card, { backgroundColor: themeColorStyle }]}>
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => item.licenseUrl && openURL(item.licenseUrl)}>
                                <View style={{ maxWidth: '90%' }}>
                                    <Text style={[styles.name, { fontFamily: 'Poppins-Bold', color: themeTextStyle }]}>{item.name}</Text>
                                    <Text style={[styles.text, { fontFamily: 'Poppins-Regular', color: themeTextStyle }]}>{item.licenses}</Text>
                                    <Text style={[styles.text, { fontFamily: 'Poppins-Regular', color: themeTextStyle }]}>{item.version}</Text>
                                </View>
                                <Entypo
                                    name="chevron-right"
                                    style={{ alignSelf: 'center' }}
                                    color={themeTextStyle}
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
