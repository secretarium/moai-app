import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../styles/chat";

const Conversation: React.FC = () => {
    return (
        <View style={styles.conversationContainer}>
            <View style={styles.header}>
                <Text style={styles.h1}>Start chatting</Text>
            </View>
            <Text>Conversation</Text>
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Type a message"
                />
                <TouchableOpacity style={styles.messageButton}>
                    <FontAwesome name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Conversation;
