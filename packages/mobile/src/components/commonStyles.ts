import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const isDark = Appearance.getColorScheme() === 'dark';

export const commonStyles = StyleSheet.create({
    applicationBackground: {
        flex: 1,
        backgroundColor: isDark ? '#1b1b1b' : '#ffffff',
        fontFamily: 'Poppins-Regular'
    },
    navbarBackground: {
        backgroundColor: isDark ? '#1b1b1b' : '#ffffff'
    },
    container: {
        flex: 1
    },
    logo: {
        height: '20%',
        width: '50%',
        top: 20
    },
    chatLogo: {
        height: '70%',
        width: '70%',
        top: 10
    },
    pin: {
        height: '80%',
        width: '100%',
        bottom: 10
    },
    pinButton: {
        height: 250,
        width: 200,
        paddingTop: 40
    },
    navigation: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    topLeftButton: {
        left: 15,
        top: 10
    },
    topRightButton: {
        right: 15,
        top: 10
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});