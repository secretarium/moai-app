import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/chat";
import MessageItem from "../../components/MessageItem/MessageItem";

const ConversationList: React.FC = () => {
    const [convoPartner, setConvoPartner] = useState(["Jack", "Jill"]);

    return (
        <View style={styles.conversationListContainer}>
            <View style={styles.header}>
                <Text style={styles.h1}>Moai Chat</Text>
            </View>
            {convoPartner.map((name, i) => (
                <MessageItem key={i} guestName={name} />
            ))}
        </View>
    );
};

export default ConversationList;
