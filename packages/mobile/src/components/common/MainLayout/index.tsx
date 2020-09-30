import React from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../../commonStyles';


type MainLayoutProps = {
    backgroundColor?: string;
    statusBarStyle?: 'dark-content' | 'light-content';
    withNavigation?: boolean;
    showGoBack?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    withNavigation = true,
    backgroundColor,
    statusBarStyle,
    showGoBack
}) => {

    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = (colorScheme === 'light') || (colorScheme === 'no-preference') ? '#D3D3D3' : '#888888';
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    return (
        <View style={{
            ...commonStyles.applicationBackground,
            ...(backgroundColor ? { backgroundColor } : {})
        }}>
            <SafeAreaView style={commonStyles.container}>
                <StatusBar barStyle={statusBarStyle ?? themeStatusBarStyle} />
                {withNavigation
                    ? <View style={commonStyles.navigation}>
                        {(showGoBack === true) ?
                            (
                                <Link to={'/'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                                    <Entypo name="chevron-left" color={themeColorStyle} size={30} />
                                </Link>
                            ) : (
                                <>
                                    <Link to={'/chat'} component={TouchableOpacity} disabled={true} style={commonStyles.topLeftButton} underlayColor='transparent'>
                                        <Entypo name="chat" size={40} color={commonStyles.applicationBackground.backgroundColor} />
                                    </Link>
                                    <Link to={'/infos'} style={commonStyles.topRightButton} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="information" size={40} color={themeColorStyle} />
                                    </Link>
                                </>
                            )}
                    </View>
                    : null}
                {children}
            </SafeAreaView>
        </View>
    );
};

export default MainLayout;