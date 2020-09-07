import '@expo/match-media';
import React from 'react';
import { View } from 'react-native';
import { useMediaQuery } from 'react-responsive';
import Conversation from './Conversation';
import ConversationList from './ConversationList';
import styles from '../../styles/chat';

const DesktopOrTablet = ({ children }) => {
    const isDesktopOrTablet = useMediaQuery({ minWidth: 768 });
    return isDesktopOrTablet ? children : null;
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
};

const Chat: React.FC = () => {
    return (
        <View style={styles.container}>
            <DesktopOrTablet>
                <ConversationList />
                <Conversation />
            </DesktopOrTablet>
            <Mobile>
                <ConversationList />
            </Mobile>
        </View>
    );
};

export default Chat;
