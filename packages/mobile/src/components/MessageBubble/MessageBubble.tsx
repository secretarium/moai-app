import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const MessageBubble: React.FC = () => {
    return (
        <View style={styles.messageContainerReceived}>
            <View style={styles.messageBubble}>
                <Text style={styles.messageText}>Test message bubble</Text>
            </View>
        </View>
    );
};

export default MessageBubble;
