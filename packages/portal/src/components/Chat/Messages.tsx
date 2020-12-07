import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import './Messages.css';
import Message from './Message';
import { useLocation, useParams } from 'react-router-dom';
import { withState } from '../../store';
import { getConversation, sendMessage } from '../../actions';
import { toDateTime } from '../../utils/timeHandler';
import MoaiPin from '../../assets/moai-pin.png';


type ParamTypes = {
    address: string;
};

const Messages = withState()((s) => ({
    messages: s.conversations.messages
}), ({ messages, dispatch }) => {

    const location = useLocation<MoaiPortal.Conversation>();
    const { address } = useParams<ParamTypes>();
    const [fetchedConversation, setFetchedConversation] = useState(false);
    const [conversation, setConversation] = useState<MoaiPortal.Conversation | undefined>();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state !== null && location.state !== undefined) {
            const convoToken = location.state.token;
            const convoAddress = location.state.address;
            setConversation({ address: convoAddress, token: convoToken });
        } else {
            setConversation(undefined);
        }
    }, [location]);

    useEffect(() => {
        setFetchedConversation(false);
    }, [address, location.state]);

    useEffect(() => {
        if (fetchedConversation === false && conversation !== undefined) {
            dispatch(getConversation(conversation.address, conversation.token));
            setFetchedConversation(true);
        }
    }, [fetchedConversation, location, dispatch, conversation, messages]);

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('you sent the following message: ', message);
        dispatch(sendMessage(conversation.address, conversation.token, message))
            .then(() => dispatch(getConversation(conversation.address, conversation.token)));
        setMessage('');
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    // eslint-disable-next-line prefer-const
    let composition = null;
    if (location.state === null || location.state === undefined)
        composition =
            <div className="messages-no-chat">
                <h1>Start chatting</h1>
            </div>;
    else
        composition =
            <>
                <div className="messages-header">
                    <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto' }} />
                    <div className="messages-header-info">
                        Conversation ID | User ID
                    </div>
                </div>
                <div className="messages-body">
                    {/* {messages.messageList.map((message) => {
                        if (message.sender === messages.myself)
                            return <Message username="user id" message={message.text} timestamp={`${message.time} pm`} isSender={true} />;
                        else
                            return <Message username="user id" message={message.text} timestamp={`${message.time} pm`} isSender={false} />;
                    })} */}
                    {messages.map((singleMessage, index) => {
                        return <Message key={index} username="User ID" message={singleMessage.text} timestamp={toDateTime(singleMessage.datetime)} isSender={true} />;
                    })}
                </div>
                <div className="messages-footer">
                    <form>
                        <input value={message} onChange={onChange} type="text" placeholder="Type a new message..." />
                        <button onClick={onClick} type="submit">Send message</button>
                    </form>
                    <i className="fas fa-paper-plane fa-2x" style={{ color: '#25A9E1', padding: '10px' }} />
                </div>
            </>;

    return (
        <div className="messages">
            {composition}
        </div>
    );
});

export default Messages;