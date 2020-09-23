import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useFonts } from 'expo-font';
//import { AppLoading } from 'expo';
import { Link } from '../../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../../commonStyles';

const MainLayout: React.FC = ({ children }) => {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf')
    });

    // Color theme
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    // if (!fontsLoaded) {
    //     return <Text>LOADING...</Text>;
    // } else {
    return (
        <SafeAreaView style={[commonStyles.container, themeContainerStyle]}>
            <StatusBar barStyle={themeStatusBarStyle} />
            <Link to={'/chat'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                <Entypo name="chat" size={40} color={themeColorStyle} />
            </Link>
            <Link to={'/about'} style={commonStyles.topRightButton} underlayColor='transparent'>
                <MaterialCommunityIcons name="information" size={40} color={themeColorStyle} />
            </Link>
            {children}
        </SafeAreaView>
    );
    //}
};

export default MainLayout;