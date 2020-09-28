import { StyleSheet, Platform } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: Platform.OS === 'android' ? 10 : 20
    },
    messageText: {
        borderRadius: 10,
        padding: 10,
        width: '80%',
        overflow: 'hidden'
    },
    modalContainer: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center'
    }
});
