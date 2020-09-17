import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    scanAgain: {
        position: 'absolute',
        right: 5,
        bottom: 20
    },
    roundedButton: {
        position: 'absolute',
        left: 15,
        bottom: 20,
        borderRadius: 30,
        backgroundColor: '#e95c59',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 25
    },
    curvedView: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#00b0ee'
    },
    cameraView: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        bottom: (-window.width * 13) / 16,
        position: 'absolute',
        overflow: 'hidden'
    },
    logo: {
        height: '20%',
        width: '50%'
    }
});
