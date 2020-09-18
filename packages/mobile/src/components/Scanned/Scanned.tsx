import React from 'react';
import { SafeAreaView, Text, Image, StatusBar, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Link } from '../../ReactRouter';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

const Scanned: React.FC = () => {
    const [fontIsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf')
    });

    // Color theme
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeColorStyle = colorScheme === 'light' ? '#E8E8E8' : '#404040';
    const themeTextStyle = colorScheme === 'light' ? 'black' : 'white';
    const themeLogoStyle = colorScheme === 'light' ? require('../../assets/logo.png') : require('../../assets/logo-white.png');
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';

    // Bold font
    const Bold = ({ children }) => <Text style={{ fontFamily: 'Poppins-Bold' }}>{children}</Text>;

    if (!fontIsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={[styles.container, themeContainerStyle]}>
                <StatusBar barStyle={themeStatusBarStyle} />
                <Link to={'/chat'} style={styles.topLeftButton} underlayColor='transparent'>
                    <Entypo name="chat" size={40} color={themeColorStyle} />
                </Link>
                <Link to={'/about'} style={styles.topRightButton} underlayColor='transparent'>
                    <MaterialCommunityIcons name="information" size={40} color={themeColorStyle} />
                </Link>
                <View style={styles.main}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: themeTextStyle, top: 30 }}>Tap to scan</Text>
                    <Image
                        source={themeLogoStyle}
                        resizeMode={'contain'}
                        style={styles.logo}
                    />
                    <Link to={'/scanner'} style={styles.pinButton} underlayColor='transparent'>
                        <Image
                            source={require('../../assets/pin-success.png')}
                            resizeMode={'contain'}
                            style={styles.pin}
                        />
                    </Link>
                </View>
                <View style={styles.messageContainer} >
                    <Text style={[styles.messageText, { fontFamily: 'Poppins-Regular', fontSize: 14, color: themeTextStyle, backgroundColor: themeColorStyle }]}>
                        <Bold>How NHS Test and Trace will contact you?</Bold>{'\n'}{'\n'}
                        You will be contacted via messaging, directly inside of Moai!{'\n'}{'\n'}
                        You'll be asked to sign in to the NHS Test and Trace contact tracing website at https://contact-tracingphe.gov.uk
                    </Text>
                </View>
            </SafeAreaView >
        );
    }
};

export default Scanned;