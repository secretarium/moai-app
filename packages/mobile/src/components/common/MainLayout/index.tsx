import React from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Link } from 'react-router-native';
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { commonStyles } from '../../commonStyles';
import { useTheme } from '../../../hooks/useTheme';


type MainLayoutProps = {
    backgroundColor?: string;
    withNavigation?: boolean;
    showGoBack?: boolean;
    goBackRoute?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    withNavigation = true,
    backgroundColor,
    showGoBack,
    goBackRoute
}) => {


    const { colors, theme } = useTheme();
    const themeLogoStyle = theme !== 'dark' ? require('../../../assets/logo-black.png') : require('../../../assets/logo-white.png');

    return (
        <View style={[commonStyles.applicationBackground, { backgroundColor: backgroundColor ? backgroundColor : colors.background }]}>
            <SafeAreaView style={commonStyles.container}>
                <StatusBar barStyle={colors.statusBar} />
                {(showGoBack !== true) ? <>{children}</> : null}
                {withNavigation
                    ? <View style={commonStyles.navigation}>
                        {(showGoBack === true) ?
                            (
                                <>
                                    <Link to={`${goBackRoute}`} style={commonStyles.topLeftButton} underlayColor='transparent'>
                                        <Entypo name="chevron-left" color={colors.icon} size={30} />
                                    </Link>
                                    <Image
                                        source={themeLogoStyle}
                                        resizeMode={'contain'}
                                        style={commonStyles.chatLogo}
                                    />
                                    <Link to={'/about'} component={TouchableOpacity} disabled={true} style={commonStyles.topRightButton} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="information" size={40} color={colors.background} />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to={'/chat'} component={TouchableOpacity} style={commonStyles.bottomLeftButton} underlayColor='transparent'>
                                        <Entypo name="chat" size={35} color={colors.icon} />
                                    </Link>
                                    <Link to={'/immunity'} component={TouchableOpacity} underlayColor='transparent'>
                                        <FontAwesome5 name="shield-virus" size={35} color={colors.icon} />
                                    </Link>
                                    <Link to={'/venues'} component={TouchableOpacity} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="history" size={40} color={colors.icon} />
                                    </Link>
                                    <Link to={'/about'} style={commonStyles.bottomRightButton} underlayColor='transparent'>
                                        <MaterialCommunityIcons name="information" size={35} color={colors.icon} />
                                    </Link>
                                </>
                            )}
                    </View>
                    : null}
                {(showGoBack === true) ? <>{children}</> : null}
            </SafeAreaView>
        </View >
    );
};

export default MainLayout;