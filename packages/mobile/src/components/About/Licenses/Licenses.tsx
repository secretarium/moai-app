import React from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { openURL } from 'expo-linking';
import { Entypo } from '@expo/vector-icons';
import licensesData from '../../../../public/licenses-mobile.json';
import MainLayout from '../../common/MainLayout';
import { useTheme } from '../../../hooks/useTheme';


const Licenses: React.FC = () => {

    const { colors } = useTheme();

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
        <MainLayout goBackRoute={'/about'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    About Moai
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 20, paddingBottom: 15 }}>
                    Third-Party Notice &amp; Credits
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text, paddingBottom: 20 }}>
                    Moai incroporates components from the projects listed below. The original copyright notices and the licenses under which Secretarium Ltd. received such components are set forth below for informational purposes. Secretarium Ltd. reserves all rights not expressly granted herein, whether by implication, estoppel or otherwise.
                </Text>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>
                    List of top-level dependencies
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
