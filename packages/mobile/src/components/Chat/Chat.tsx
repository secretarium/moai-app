import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import 'react-native-get-random-values';
import Modal from 'react-native-modal';
import { v4 as uuidv4 } from 'uuid';
import MainLayout from '../common/MainLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useColorScheme } from 'react-native-appearance';
import { GiftedChat, Bubble, Time, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { getConversation, sendMessage } from '../../actions';
import { withState } from '../../store';
import { useHistory } from 'react-router';
import { commonStyles } from '../commonStyles';
import i18n from 'i18n-js';


const Chat = withState()((s) => ({
    messages: s.conversations.messages,
    conversation: s.conversations.conversation,
    expoPushToken: s.system.expoPushToken
}), ({ messages, conversation, expoPushToken, dispatch }) => {

    const history = useHistory();
    const [stateMessages, setMessages] = useState([]);
    const [hasFetchedConversation, setHasFetchedConversation] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string>();

    const colorScheme = useColorScheme();
    const themeColorStyle = colorScheme !== 'dark' ? '#D3D3D3' : '#404040';
    const themeTextStyle = colorScheme !== 'dark' ? 'black' : 'white';
    const themeInputStyle = colorScheme !== 'dark' ? '#ffffff' : '#1b1b1b';

    useEffect(() => {
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
    }, [messages]);

    useEffect(() => {
        if (isEmptyObject(conversation) || conversation === null || conversation === undefined) {
            setError('No one has contacted you.');
            setShowModal(true);
        }
        if (hasFetchedConversation === false && !isEmptyObject(conversation) && conversation !== undefined) {
            setHasFetchedConversation(true);
            dispatch(getConversation(conversation.address, conversation.token, expoPushToken));
        }
    }, [dispatch, hasFetchedConversation, conversation, messages, history, expoPushToken]);

    const onSend = ([message]) => {
        if (!isEmptyObject(conversation) || conversation !== null) {
            dispatch(sendMessage(conversation.address, conversation.token, message.text));
        }
    };

    const isEmptyObject = (obj) => {
        return JSON.stringify(obj) === '{}';
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
        <MainLayout goBackRoute={'/'} showGoBack={true}>
            <Modal isVisible={showModal}>
                <View style={[commonStyles.modalContainer, { backgroundColor: themeColorStyle }]}>
                    <MaterialIcons name='error' size={84} color={themeTextStyle} />
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16, color: themeTextStyle }}>
                        {error}
                    </Text>
                    <Button title='Close' onPress={() => history.push('/')} />
                </View>
            </Modal>
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
                placeholder={i18n.t('APP_TYPE_MESSAGE')}
                alwaysShowSend
                showUserAvatar
            />
        </MainLayout>
    );
});

export default Chat;
