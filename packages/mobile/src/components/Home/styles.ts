import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    logo: {
        height: '20%',
        width: '50%'
    },
    pin: {
        height: '80%',
        width: '100%'
    },
    pinButton: {
        height: 250,
        width: 250
    },
    topLeftButton: {
        position: 'absolute',
        left: 20,
        top: 30
    },
    topRightButton: {
        position: 'absolute',
        right: 20,
        top: 30
    }
});