import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../common/MainLayout';
import { styles } from './styles';
import { useColorScheme } from 'react-native-appearance';
import { GiftedChat, Bubble, Time, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';


const Chat: React.FC = () => {
    const [messages, setMessages] = useState([]);

    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const themeInputStyle = colorScheme !== 'dark' ? '#ffffff' : '#1b1b1b';

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: require('../../assets/nhs-logo.png')
                }
            }
        ]);
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: themeColorStyle
                    },
                    right: {
                        backgroundColor: '#e95c59'
                    }
                }}
                textStyle={{
                    left: {
                        color: themeTextStyle,
                        fontFamily: 'Poppins-Regular'
                    },
                    right: {
                        color: '#fff',
                        fontFamily: 'Poppins-Regular'
                    }
                }}
            />
        );
    };

    const renderTime = (props) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: themeTextStyle,
                        fontFamily: 'Poppins-Regular'
                    },
                    right: {
                        color: '#fff',
                        fontFamily: 'Poppins-Regular'
                    }
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props} containerStyle={styles.sendContainer}>
                <FontAwesome name="send" size={24} color="#00b0ee" />
            </Send>
        );
    };

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar {...props} containerStyle={[styles.footerContainer, { backgroundColor: themeInputStyle, borderTopColor: themeInputStyle }]} />
        );
    };

    const renderComposer = (props) => {
        return (
            <Composer {...props} textInputStyle={[styles.inputContainer, { backgroundColor: themeColorStyle, color: themeTextStyle }]} multiline={true} />
        );
    };

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);

    return (
        <MainLayout showGoBack={true}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
                renderBubble={renderBubble}
                renderTime={renderTime}
                renderSend={renderSend}
                renderComposer={renderComposer}
                renderInputToolbar={renderInputToolbar}
                placeholder='Type a new message...'
                alwaysShowSend
            // minComposerHeight={28}
            // maxComposerHeight={106}
            // minInputToolbarHeight={50}
            />
        </MainLayout>
    );
};

export default Chat;
