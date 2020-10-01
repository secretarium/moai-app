import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#00b0ee'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
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
