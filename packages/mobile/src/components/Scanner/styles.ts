import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

export const styles = StyleSheet.create({
    logo: {
        height: '20%',
        width: '50%'
    },
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
    }
});
