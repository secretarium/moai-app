import { StyleSheet } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 60
    },
    messageText: {
        borderRadius: 10,
        padding: 10,
        width: '85%',
        overflow: 'hidden'
    }
});
