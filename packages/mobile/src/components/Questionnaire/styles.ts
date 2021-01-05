import { StyleSheet } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        width: '33%',
        top: 40
    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 15,
        marginLeft: 15
    },
    textBox: {
        borderWidth: 1,
        borderColor: 'rgba(204,204,204,1)',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        marginLeft: 10,
        marginRight: 10
    }
});