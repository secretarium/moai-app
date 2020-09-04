import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const MessageBubble: React.FC = () => {
    return (
        <View style={styles.messageReceived}>
            <Text style={styles.messageText}>Test message bubble</Text>
        </View>
    );
};

export default MessageBubble;
