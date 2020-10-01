import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
    curvedView: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#00b0ee',
        paddingTop: 15
    },
    cameraView: {
        borderTopLeftRadius: screen.width,
        borderTopRightRadius: screen.width,
        width: screen.width,
        height: '100%',
        top: 220,
        position: 'absolute',
        overflow: 'hidden'
    },
    logo: {
        height: '20%',
        width: '50%'
    }
});