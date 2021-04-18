import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MainLayout from '../../common/MainLayout';
import { Entypo } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';
import styles from './styles';
import { Link } from 'react-router-native';
import { useTheme } from '../../../hooks/useTheme';


const Keys: React.FC = () => {

    const [key, setKey] = useState<string>();
    const { colors } = useTheme();
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
        <MainLayout goBackRoute={'/about'} showGoBack={true}>
            <View style={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 25, paddingBottom: 15 }}>
                    Public Keys
                </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: colors.text }}>
                    List of public keys used to connect to the Secretarium backend
                </Text>
            </View>
            <ScrollView>
                <TouchableOpacity style={[styles.card, { backgroundColor: colors.button }]}>
                    <Link to={`/key/${publicKey}`} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} underlayColor='transparent'>
                        <>
                            <View style={{ maxWidth: '90%' }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', color: colors.text, fontSize: 16 }}>{key}</Text>
                            </View>
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

export default Keys;
