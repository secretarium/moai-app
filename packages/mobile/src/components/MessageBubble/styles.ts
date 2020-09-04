import { StyleSheet } from "react-native";

export default StyleSheet.create({
    messageSent: {
        justifyContent: "flex-end",
        borderRadius: 22,
        backgroundColor: "orange",
    },
    messageReceived: {
        justifyContent: "flex-start",
        borderRadius: 22,
        backgroundColor: "orange",
        marginRight: 25,
    },
    messageText: {
        color: "white",
        padding: 12,
    },
});
