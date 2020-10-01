import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../ReactRouter';
import MainLayout from '../common/MainLayout';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import MoaiScanner from '../MoaiScanner';


const Scanner: React.FC = () => {

    // Color theme
    const colorScheme = useColorScheme();
    const themeTextStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? 'white' : 'black';

    return (
        <MainLayout backgroundColor='#00b0ee' withNavigation={false}>
            <MoaiScanner />
            <TouchableOpacity style={styles.roundedButton}>
                <Link to={'/'}>
                    <Entypo name='chevron-left' style={{ alignSelf: 'center', color: themeTextStyle }} size={30} />
                </Link>
            </TouchableOpacity>
        </MainLayout>
    );
};

export default Scanner;
