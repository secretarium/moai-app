import React from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styles from './styles';
import { openURL } from 'expo-linking';
import { Entypo } from '@expo/vector-icons';
import licensesData from '../../../public/licenses-mobile.json';
import MainLayout from '../../components/common/MainLayout';

const Licenses: React.FC = () => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeTextStyle = colorScheme === 'light' ? 'black' : 'white';

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
        <MainLayout scanned={true} withNavigation={true}>
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
