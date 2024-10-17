import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'react-router-native';
import MainLayout from '../common/MainLayout/index';
import { commonStyles } from './styles';
import i18n from '../../services/i18n';
import { version as packageVersion } from '../../../package.json';
import { useTheme } from '../../hooks/useTheme';


const About: React.FC = () => {

    const { colors } = useTheme();

    return (
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    {i18n.t('APP_ABOUT')}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text, fontSize: 20, paddingBottom: 15 }}>
                    v{packageVersion}
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                    {i18n.t('APP_ABOUT_SECRETARIUM')}
                </Text>
            </View>
            <ScrollView>
                <TouchableOpacity style={[commonStyles.card, { backgroundColor: colors.button }]}>
                    <Link to={`/licenses`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_INFOS_LICENSES')}</Text>
                            <Entypo
                                name="chevron-right"
                                style={{ alignSelf: 'center' }}
                                color={colors.text}
                                size={24} />
                        </>
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.card, { backgroundColor: colors.button }]}>
                    <Link to={`/licenses`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_INFOS_KEYS')}</Text>
                            <Entypo
                                name="chevron-right"
                                style={{ alignSelf: 'center' }}
                                color={colors.text}
                                size={24} />
                        </>
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.card, { backgroundColor: colors.button }]}>
                    <Link to={`/licenses`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_INFOS_NOTICES')}</Text>
                            <Entypo
                                name="chevron-right"
                                style={{ alignSelf: 'center' }}
                                color={colors.text}
                                size={24} />
                        </>
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.card, { backgroundColor: colors.button }]}>
                    <Link to={`/licenses`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 15 }}>{i18n.t('APP_INFOS_PUSH')}</Text>
                            <Entypo
                                name="chevron-right"
                                style={{ alignSelf: 'center' }}
                                color={colors.text}
                                size={24} />
                        </>
                    </Link>
                </TouchableOpacity>
            </ScrollView>
        </MainLayout>
    );
};

export default About;
