import { StyleSheet } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
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
    },
    modalContainer: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center'
    }
});
