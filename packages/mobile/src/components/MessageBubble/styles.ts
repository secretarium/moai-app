import { StyleSheet } from "react-native";

export default StyleSheet.create({
    messageContainerReceived: {
        justifyContent: "flex-start",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "2%",
        paddingRight: "2%",
        marginTop: 4,
    },
    messageContainerSent: {
        justifyContent: "flex-end",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "2%",
        paddingRight: "2%",
        marginTop: 4,
    },
    messageBubble: {
        borderRadius: 22,
        backgroundColor: "#d94481",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: "flex-start",
    },
    messageText: {
        letterSpacing: 0,
        fontSize: 16,
        color: "white",
    },
});
