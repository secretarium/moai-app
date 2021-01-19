import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Entypo } from '@expo/vector-icons';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout/index';
import styles from './styles';
import i18n from 'i18n-js';


const Infos: React.FC = () => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true} withNavigation={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    {i18n.t('APP_ABOUT')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                    Moai is a smart, secure contact tracing solution created by Secretarium, a deep-tech startup founded in 2016 with the aim of building useful technology that never compromises anyone’s privacy.{'\n'}{'\n'}
                    The founders are from the world of banking, but they left to pursue projects that would solve problems around handling highly sensitive data: enforcing consent and guaranteeing privacy by design and by default.
                </Text>
            </View>
            {i18n.t('APP_INFOS').map((item, index) =>
                <TouchableOpacity style={[styles.card, { backgroundColor: themeColorStyle }]} key={index}>
                    <Link to={`/${item.toLowerCase()}`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 15 }}>{item}</Text>
                            <Entypo
                                name="chevron-right"
                                style={{ alignSelf: 'center' }}
                                color={themeTextStyle}
                                size={24} />
                        </>
                    </Link>
                </TouchableOpacity>
            )}
        </MainLayout>
    );
};

export default Infos;
