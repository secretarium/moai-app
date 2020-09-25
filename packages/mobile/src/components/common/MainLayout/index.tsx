import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Link } from '../../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from '../../commonStyles';
import NavigationBar from 'react-native-navbar';

interface Props {
    children: React.ReactNode;
    scanned: boolean;
}

const MainLayout: React.FC<Props> = (props) => {
    // Color theme
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    return (
        <SafeAreaView style={[commonStyles.container, themeContainerStyle]}>
            <StatusBar barStyle={themeStatusBarStyle} />
            <NavigationBar
                style={themeContainerStyle}
                leftButton={(props.scanned === true) ?
                    (
                        <Link to={'/'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                            <Entypo name="chevron-left" color={themeColorStyle} size={30} />
                        </Link>

                    ) : (
                        <Link to={'/chat'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                            <Entypo name="chat" size={40} color={themeColorStyle} />
                        </Link>
                    )}
                rightButton={
                    <Link to={'/licenses'} style={commonStyles.topRightButton} underlayColor='transparent'>
                        <MaterialCommunityIcons name="information" size={40} color={themeColorStyle} />
                    </Link>}
                statusBar={{ hidden: true }} />
            {props.children}
        </SafeAreaView >
    );
};

export default MainLayout;