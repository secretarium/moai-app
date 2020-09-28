import React from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, View, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import styles from './styles';
import { openURL } from 'expo-linking';
import { commonStyles } from '../commonStyles';
import NavigationBar from 'react-native-navbar';
import { Link } from '../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import licensesData from '../../../public/licenses-mobile.json';

const Licenses: React.FC = () => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeTextStyle = colorScheme === 'light' ? 'black' : 'white';
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

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
        <SafeAreaView style={[commonStyles.container, themeContainerStyle]}>
            <StatusBar barStyle={themeStatusBarStyle} />
            <NavigationBar
                style={themeContainerStyle}
                leftButton={
                    <Link to={'/'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                        <Entypo name="chevron-left" color={themeTextStyle} size={30} />
                    </Link>}
                title={
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: themeTextStyle }}>
                        Licenses
                    </Text>
                }
                statusBar={{ hidden: true }} />
            <FlatList
                data={getLicenses}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.cardShadow}>
                            <View style={[styles.card, { backgroundColor: themeColorStyle }]}>
                                <TouchableOpacity
                                    underlayColor={'#eeeeee'}
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
                    </View>
                )}
            />
        </SafeAreaView >
    );
};

export default Licenses;
