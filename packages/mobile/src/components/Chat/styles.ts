import { StyleSheet } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        borderRadius: 15,
        width: '85%',
        padding: 10
    },
    sendContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 10
    }
});
