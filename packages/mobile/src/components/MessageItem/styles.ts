import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '7%',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    containerMobile: {
        width: '100%',
        height: '12%',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    guestProfile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestName: {
        flex: 3,
        justifyContent: 'center',
        paddingLeft: 10
    }
});
