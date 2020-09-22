import React from 'react';
import { SafeAreaView, Text, Image, StatusBar, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Link } from '../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { commonStyles } from './styles';

const Home: React.FC = () => {
    const [fontIsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf')
    });

    // Color theme
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer;
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeTextStyle = colorScheme === 'light' ? 'black' : 'white';
    const themeLogoStyle = colorScheme === 'light' ? require('../../assets/logo.png') : require('../../assets/logo-white.png');
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    if (!fontIsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={[commonStyles.container, themeContainerStyle]}>
                <StatusBar barStyle={themeStatusBarStyle} />
                <Link to={'/chat'} style={commonStyles.topLeftButton} underlayColor='transparent'>
                    <Entypo name="chat" size={40} color={themeColorStyle} />
                </Link>
                <Link to={'/about'} style={commonStyles.topRightButton} underlayColor='transparent'>
                    <MaterialCommunityIcons name="information" size={40} color={themeColorStyle} />
                </Link>
                <View style={commonStyles.main}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Tap to scan</Text>
                    <Image
                        source={themeLogoStyle}
                        resizeMode={'contain'}
                        style={commonStyles.logo}
                    />
                    <Link to={'/scanner'} style={commonStyles.pinButton} underlayColor='transparent'>
                        <Image
                            source={require('../../assets/pin-default.png')}
                            resizeMode={'contain'}
                            style={commonStyles.pin}
                        />
                    </Link>
                </View>
            </SafeAreaView>
        );
    }
};

export default Home;