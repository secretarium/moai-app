import { StyleSheet, Platform } from 'react-native';
import { Appearance } from 'react-native-appearance';

const isDark = Appearance.getColorScheme() === 'dark';

export const commonStyles = StyleSheet.create({
    applicationBackground: {
        flex: 1,
        backgroundColor: isDark ? '#1b1b1b' : '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
    container: {
        flex: 1
    },
    logo: {
        height: '20%',
        width: '50%',
        top: 20
    },
    pin: {
        height: '80%',
        width: '100%'
    },
    pinButton: {
        height: 250,
        width: 200,
        paddingTop: 40
    },
    topLeftButton: {
        position: 'absolute',
        left: 15,
        top: Platform.OS === 'android' ? 10 : 30
    },
    topRightButton: {
        position: 'absolute',
        right: 15,
        top: Platform.OS === 'android' ? 10 : 30
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    }
});