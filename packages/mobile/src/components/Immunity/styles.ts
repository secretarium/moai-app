import { StyleSheet } from 'react-native';
export { commonStyles } from '../commonStyles';

export const styles = StyleSheet.create({
    qrCodeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrCode: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 25,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#e95c59',
        width: '80%'
    },
    qrCodeTitle: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});