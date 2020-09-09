import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import styles from "../../styles/chat";
import MessageItem from "../../components/MessageItem/MessageItem";

const ConversationList: React.FC = () => {
    const [convoPartner, setConvoPartner] = useState(["Jack", "Jill"]);

    return (
        <SafeAreaView style={styles.conversationListContainer}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.h1}>Moai Chat</Text>
            </SafeAreaView>
            {convoPartner.map((name, i) => (
                <MessageItem key={i} guestName={name} />
            ))}
        </SafeAreaView>
    );
};

export default ConversationList;
