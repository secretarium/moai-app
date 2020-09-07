import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import MoaiLogo from '../../assets/logo.svg';

const WelcomeScreen: React.FC = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.logo}>
                <MoaiLogo />
            </View>
        </TouchableOpacity>
    );
};

export default WelcomeScreen;
