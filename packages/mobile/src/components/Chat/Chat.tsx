import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Conversation from './Conversation';
import ConversationList from './ConversationList';
import styles from './styles';
import { DesktopOrTablet, Mobile } from '../../Breakpoints';

const Chat: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="#fff"
                barStyle="dark-content"
            />
            <DesktopOrTablet>
                <ConversationList />
                <Conversation />
            </DesktopOrTablet>
            <Mobile>
                <ConversationList />
            </Mobile>
        </SafeAreaView>
    );
};

export default Chat;
