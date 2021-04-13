import React from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../../ReactRouter';
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { commonStyles } from '../../commonStyles';


type MainLayoutProps = {
    backgroundColor?: string;
    statusBarStyle?: 'dark-content' | 'light-content';
    withNavigation?: boolean;
    showGoBack?: boolean;
    goBackRoute?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    withNavigation = true,
    backgroundColor,
    statusBarStyle,
    showGoBack,
    goBackRoute
}) => {


    // Color theme
    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#888888';
    const themeStatusBarStyle = colorScheme !== 'dark' ? 'dark-content' : 'light-content';
    const themeLogoStyle = colorScheme !== 'dark' ? require('../../../assets/logo-black.png') : require('../../../assets/logo-white.png');

    return (
        <View style={{
            ...commonStyles.applicationBackground,
            ...(backgroundColor ? { backgroundColor } : {})
        }}>
            <SafeAreaView style={commonStyles.container}>
                <StatusBar barStyle={statusBarStyle ?? themeStatusBarStyle} />
                {(showGoBack !== true) ? <>{children}</> : null}
                {withNavigation
                    ? <View style={commonStyles.navigation}>
                        {(showGoBack === true) ?
                            (
                                <>
                                    <Link to={`${goBackRoute}`} style={commonStyles.topLeftButton} underlayColor='transparent'>
                                        <Entypo name="chevron-left" color={themeColorStyle} size={30} />
                                    </Link>
                                    <Image
                                        source={themeLogoStyle}
                                        resizeMode={'contain'}
                                        style={commonStyles.chatLogo}
                                    />
                                    <Link to={'/infos'} component={TouchableOpacity} disabled={true} style={commonStyles.topRightButton} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="information" size={40} color={commonStyles.applicationBackground.backgroundColor} />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/chat'} component={TouchableOpacity} style={commonStyles.bottomLeftButton} underlayColor='transparent'>
                                        <Entypo name="chat" size={35} color={themeColorStyle} />
                                    </Link>
                                    <Link to={'/immunity'} component={TouchableOpacity} underlayColor='transparent'>
                                        <FontAwesome5 name="shield-virus" size={35} color={themeColorStyle} />
                                    </Link>
                                    <Link to={'/venues'} component={TouchableOpacity} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="history" size={40} color={themeColorStyle} />
                                    </Link>
                                    <Link to={'/infos'} style={commonStyles.bottomRightButton} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="information" size={35} color={themeColorStyle} />
                                    </Link>
                                </>
                            )}
                    </View>
                    : null}
                {(showGoBack === true) ? <>{children}</> : null}
            </SafeAreaView>
        </View>
    );
};

export default MainLayout;