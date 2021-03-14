import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eb7473'
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    text: {
        fontSize: 18,
        color: '#fff',
        top: 20,
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
        width: '33%',
        top: 40
    }
});
