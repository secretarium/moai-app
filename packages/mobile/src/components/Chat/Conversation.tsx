import React from 'react';
import { Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DesktopOrTablet, Mobile } from '../../Breakpoints';
import styles from '../../styles/chat';
import MessageBubble from '../../components/MessageBubble/MessageBubble';

const Conversation: React.FC = () => {
    return (
        <SafeAreaView style={styles.conversationContainer}>
            <DesktopOrTablet>
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
            </DesktopOrTablet>
            <Mobile>
                <SafeAreaView style={styles.headerMobile}>
                    <Text style={styles.h1}>Start chatting</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.messages}>
                    <MessageBubble />
                </SafeAreaView>
                <SafeAreaView style={styles.messageInputContainerMobile}>
                    <TextInput
                        style={styles.messageInput}
                        placeholder="Type a message"
                    />
                    <TouchableOpacity style={styles.messageButtonMobile}>
                        <FontAwesome name="send" size={24} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            </Mobile>
        </SafeAreaView>
    );
};

export default Conversation;
