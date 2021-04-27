import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    applicationBackground: {
        flex: 1,
        fontFamily: 'Poppins-Regular'
    },
    container: {
        flex: 1
    },
    logo: {
        height: '20%',
        width: '50%',
        top: 20
    },
    chatLogo: {
        height: '70%',
        width: '70%',
        top: 15
    },
    pin: {
        height: '80%',
        width: '100%',
        bottom: 10
    },
    pinButton: {
        height: 250,
        width: 200,
        paddingTop: 40
    },
    navigation: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    topLeftButton: {
        left: 15,
        top: 15
    },
    topMidButton: {
        top: 10
    },
    topRightButton: {
        right: 15,
        top: 10
    },
    bottomLeftButton: {
        left: 20
    },
    bottomRightButton: {
        right: 20
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderRadius: 4,
        overflow: 'hidden',
        alignItems: 'center',
        maxWidth: '90%',
        marginHorizontal: 12,
        marginVertical: 6,
        padding: 20
    },
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