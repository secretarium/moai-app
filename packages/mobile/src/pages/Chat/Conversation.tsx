import React from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../../styles/chat";
import MessageBubble from "../../components/MessageBubble/MessageBubble";

const Conversation: React.FC = () => {
    return (
        <SafeAreaView style={styles.conversationContainer}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.h1}>Start chatting</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.messages}>
                <MessageBubble />
            </SafeAreaView>
            <SafeAreaView style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Type a message"
                />
                <TouchableOpacity style={styles.messageButton}>
                    <FontAwesome name="send" size={24} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default Conversation;
