import React, { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { DesktopOrTablet, Mobile } from "../../Breakpoints";
import styles from "../../styles/chat";
import MessageItem from "../../components/MessageItem/MessageItem";

const ConversationList: React.FC = () => {
    const [convoPartner] = useState(['Jack', 'Jill']);

    return (
        <SafeAreaView style={styles.conversationListContainer}>
            <DesktopOrTablet>
                <SafeAreaView style={styles.header}>
                    <Text style={styles.h1}>Moai Chat</Text>
                </SafeAreaView>
            </DesktopOrTablet>
            <Mobile>
                <SafeAreaView style={styles.headerMobile}>
                    <Text style={styles.h1}>Moai Chat</Text>
                </SafeAreaView>
            </Mobile>
            {convoPartner.map((name, i) => (
                <MessageItem key={i} guestName={name} />
            ))}
        </SafeAreaView>
    );
};

export default ConversationList;
