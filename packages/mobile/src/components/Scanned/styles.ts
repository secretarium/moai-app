import { StyleSheet } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 80
    },
    messageText: {
        borderRadius: 10,
        padding: 15,
        width: '85%',
        overflow: 'hidden'
    },
    homeButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10, padding: 10,
        backgroundColor: 'white',
        width: '85%',
        bottom: 45
    }
});
