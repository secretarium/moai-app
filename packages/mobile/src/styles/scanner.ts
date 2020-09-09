import { StyleSheet, StatusBar, Platform } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d3083",
        height: "100%",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    circleButton: {
        height: 200,
        width: 200,
        borderRadius: 400,
        backgroundColor: "#d94481",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    goBack: {
        position: "absolute",
        left: 15,
        bottom: 20,
    },
    scanAgain: {
        position: "absolute",
        right: 5,
        bottom: 20,
    },
    roundedButton: {
        borderRadius: 30,
        backgroundColor: "#d94481",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 25,
    },
    cameraContainer: {},
});
