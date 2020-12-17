import React, { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import MainLayout from '../common/MainLayout';
import { styles } from './styles';
import { useColorScheme } from 'react-native-appearance';
import { GiftedChat, Bubble, Time, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { getConversation, sendMessage } from '../../actions/conversations';
import { withState } from '../../store';


const Chat = withState()((s) => ({
    messages: s.conversations.messages,
    conversationList: s.conversations.conversationList,
    conversation: s.conversations.conversation
}), ({ messages, conversationList, dispatch }) => {

    const [stateMessages, setMessages] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const themeInputStyle = colorScheme !== 'dark' ? '#ffffff' : '#1b1b1b';

    useEffect(() => {
        if (hasFetched) {
            const msgs = messages.map(message => (
                {
                    _id: uuidv4(),
                    text: message.text,
                    createdAt: new Date(message.datetime / 1000000),
                    user: {
                        _id: message.sender,
                        avatar: message.sender === 0 ? require('../../assets/moai-pin.png') : null
                    }
                }
            )).reverse();
            setMessages(msgs);
        }
    }, [hasFetched, messages]);

    useEffect(() => {
        async function fetchConversation() {
            if (conversationList.length > 0) {
                dispatch(getConversation(conversationList[0].address, conversationList[0].token))
                    .then(() => {
                        setHasFetched(true);
                        setIsFetching(false);
                    });
            }
        }
        if (!hasFetched && !isFetching) {
            setIsFetching(true);
            fetchConversation();
        }
    }, [dispatch, hasFetched, isFetching, conversationList]);

    const onSend = ([message]) => {
        dispatch(sendMessage(conversationList[0].address, conversationList[0].token, message.text))
            .then(() => {
                setHasFetched(false);
            });
    };

    // Message Bubble
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

    // Message Timestamp
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

    // Message Send Button
    const renderSend = (props) => {
        return (
            <Send {...props} containerStyle={styles.sendContainer}>
                <FontAwesome name="send" size={24} color="#00b0ee" />
            </Send>
        );
    };

    // Message Text Input
    const renderInputToolbar = (props) => {
        return (
            <InputToolbar {...props} containerStyle={[styles.footerContainer, { backgroundColor: themeInputStyle, borderTopColor: themeInputStyle }]} />
        );
    };

    // Message Bottom Bar (Text Input + Send Button)
    const renderComposer = (props) => {
        return (
            <Composer {...props} textInputStyle={[styles.inputContainer, { backgroundColor: themeColorStyle, color: themeTextStyle }]} multiline={true} />
        );
    };

    return (
        <MainLayout showGoBack={true}>
            <GiftedChat
                messages={stateMessages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name: 'Test User'
                }}
                renderBubble={renderBubble}
                renderTime={renderTime}
                renderSend={renderSend}
                renderComposer={renderComposer}
                renderInputToolbar={renderInputToolbar}
                placeholder='Type a new message...'
                alwaysShowSend
                showUserAvatar
            />
        </MainLayout>
    );
});

export default Chat;
