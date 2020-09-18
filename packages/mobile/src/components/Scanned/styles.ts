import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    lightContainer: {
        backgroundColor: '#fff'
    },
    darkContainer: {
        backgroundColor: '#1b1b1b'
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
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20
    },
    messageText: {
        borderRadius: 10,
        padding: 10,
        width: '80%',
        overflow: 'hidden'
    }
});