import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import './Messages.css';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import Message from './Message';
import { useParams, useLocation } from 'react-router-dom';
import { withState } from '../../store';
import { getConversation, sendMessage } from 'actions/secretarium';


interface ParamTypes {
    id: string;
}

interface LocationTypes {
    token: number;
}

const Messages = withState()((s) => ({
    messages: s.conversations.messages
}), ({ messages, dispatch }) => {

    const { id } = useParams<ParamTypes>();
    const location = useLocation<LocationTypes>();
    const [fetchedConversation, setFetchedConversation] = useState(false);
    const [token, setToken] = useState<number | undefined>();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state !== undefined) {
            const convoToken = location.state.token;
            setToken(convoToken);
        } else {
            setToken(null);
        }
    }, [location.state]);

    useEffect(() => {
        if (fetchedConversation === false) {
            setFetchedConversation(true);
            dispatch(getConversation(parseInt(id), token));
        }
    }, [fetchedConversation, dispatch, id, token]);

    useEffect(() => {
        console.log('SWITCHEDDDD');
        setFetchedConversation(true);
        dispatch(getConversation(parseInt(id), token));
    }, [dispatch, id, token]);

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('you sent the following message: ', message);
        dispatch(sendMessage(parseInt(id), token, message));
        setFetchedConversation(false);
        console.log(messages.messageList);
        setMessage('');
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    // eslint-disable-next-line prefer-const
    let composition = null;
    if (id === undefined)
        composition =
            <div className="messages-no-chat">
                <h1>Start chatting</h1>
            </div>;
    else
        composition =
            <>
                <div className="messages-header">
                    <div className="messages-header-info">
                        <h2>Conversation ID {id} | User ID {messages.users.idB}</h2>
                    </div>
                    <MoreOutlined style={{ fontSize: '26px', color: '#203864' }} />
                </div>
                <div className="messages-body">
                    {messages.messageList.map((message) => {
                        if (message.sender === messages.myself)
                            return <Message username={`User ID ${messages.myself}`} message={message.text} timestamp={`${message.time} pm`} isSender={true} />;
                        else
                            return <Message username={`User ID ${messages.users.idB}`} message={message.text} timestamp={`${message.time} pm`} isSender={false} />;
                    })}
                </div>
                <div className="messages-footer">
                    <form>
                        <input value={message} onChange={onChange} type="text" placeholder="Type a new message..." />
                        <button onClick={onClick} type="submit">Send message</button>
                    </form>
                    <i className="fas fa-paper-plane fa-2x" style={{ color: '#1ca8e1', padding: '10px' }} />
                </div>
            </>;

    return (
        <div className="messages">
            {composition}
        </div>
    );
});

export default Messages;