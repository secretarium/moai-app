import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import MainLayout from '../../common/MainLayout';
import { Entypo } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import styles from './styles';
import { Link } from '../../../ReactRouter';


const Keys: React.FC = () => {

    const [key, setKey] = useState<string>();

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';

    const publicKey = 'rliD_CISqPEeYKbWYdwa-L-8oytAPvdGmbLC0KdvsH-OVMraarm1eo-q4fte0cWJ7-kmsq8wekFIJK0a83_yCg==';

    useEffect(() => {
        (async () => {
            const digest = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                publicKey
            );
            setKey(digest.toString().match(/.{1,2}/g).join(':'));
        })();
    }, []);

    return (
        <MainLayout goBackRoute={'/infos'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 25, paddingBottom: 15 }}>
                    Public Keys
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: themeTextStyle }}>
                    List of public keys used to connect to the Secretarium backend
                </Text>
            </View>
            <ScrollView>
                <TouchableOpacity style={[styles.card, { backgroundColor: themeColorStyle }]}>
                    <Link to={`/key/${publicKey}`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <View style={{ maxWidth: '90%' }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: themeTextStyle, fontSize: 16 }}>{key}</Text>
                            </View>
                            <Entypo
                                name="chevron-right"
                                style={{ alignSelf: 'center' }}
                                color={themeTextStyle}
                                size={24} />
                        </>
                    </Link>
                </TouchableOpacity>
            </ScrollView>

        </MainLayout>
    );
};

export default Keys;
