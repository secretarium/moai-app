import React from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, View, Linking, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { openURL } from 'expo-linking';
import { commonStyles } from '../commonStyles';

const Licenses: React.FC = () => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    const licensesData = require('../../../public/licenses-mobile.json');

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

    const licenses = Object.keys(licensesData).map(key => {
        const { licenses, ...license } = licensesData[key];
        const [name, version] = getNameAndVersion(key);

        return {
            key,
            name,
            licenses: licenses.slice(0, 405),
            version,
            ...license
        };
    });

    return (
        <SafeAreaView style={[commonStyles.container, themeContainerStyle]}>
            <StatusBar barStyle={themeStatusBarStyle} />
            <FlatList
                data={licenses}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.cardShadow}>
                            <View style={styles.card}>
                                <TouchableOpacity
                                    underlayColor={'#eeeeee'}
                                    style={styles.item}
                                    onPress={() => item.licenseUrl && openURL(item.licenseUrl)}>
                                    <View style={{ maxWidth: '90%' }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.text}>{item.licenses}</Text>
                                        <Text style={styles.text}>{item.version}</Text>
                                    </View>
                                    <FontAwesome
                                        style={{ alignSelf: 'center' }}
                                        color={'#34495e'}
                                        size={16}
                                        name={'chevron-right'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView >
    );
};

export default Licenses;
