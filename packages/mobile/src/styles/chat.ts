import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        height: "100vh",
    },
    conversationListContainer: {
        flex: 1,
        borderRightColor: "#d3d3d3",
        borderRightWidth: 1,
    },
    conversationContainer: {
        flex: 3,
        justifyContent: "space-between",
    },
    header: {
        height: "5%",
        width: "100%",
        backgroundColor: "#2d3083",
        justifyContent: "center",
    },
    h1: {
        color: "white",
        fontSize: 25,
        paddingLeft: 10,
    },
    messageInputContainer: {
        height: "6%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d3083",
        flexDirection: "row",
    },
    messageInput: {
        borderRadius: 25,
        width: "85%",
        backgroundColor: "#fff",
        padding: 10,
        outlineStyle: "none",
        outlineWidth: 0,
    },
    messageButton: {
        width: "7%",
        justifyContent: "center",
        alignItems: "center",
    },
});
