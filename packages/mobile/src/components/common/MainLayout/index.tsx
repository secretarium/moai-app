import React from 'react';
import { SafeAreaView, View, StatusBar, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useFonts } from 'expo-font';
import { Link } from '../../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../../commonStyles';

type MainLayoutProps = {
    backgroundColor?: string;
    statusBarStyle?: 'dark-content' | 'light-content';
    withNavigation?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    withNavigation = true,
    backgroundColor,
    statusBarStyle
}) => {

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf')
    });

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#888888';
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    let composition;

    if (!fontsLoaded)
        composition = <Text>Loading...</Text>;
    else
        composition = <>
            {withNavigation
                ? <>
                    <Link to={'/chat'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                        <Entypo name="chat" size={40} color={themeColorStyle} />
                    </Link>
                    <Link to={'/about'} style={commonStyles.topRightButton} underlayColor='transparent'>
                        <MaterialCommunityIcons name="information" size={40} color={themeColorStyle} />
                    </Link>
                </>
                : null}
            {children}
        </>;

    return (
        <View style={{
            ...commonStyles.applicationBackground,
            ...(backgroundColor ? { backgroundColor } : {})
        }}>
            <SafeAreaView style={commonStyles.container}>
                <StatusBar barStyle={statusBarStyle ?? themeStatusBarStyle} />
                {composition}
            </SafeAreaView>
        </View>
    );
};

export default MainLayout;