import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import './Messages.css';
import Message from './Message';
import { useParams, useLocation } from 'react-router-dom';
import { withState } from '../../store';
import { getConversation, sendMessage } from 'actions/secretarium';
import MoaiPin from '../../assets/moai-pin.png';


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

    // useEffect(() => {
    //     if (location.state !== undefined) {
    //         const convoToken = location.state.token;
    //         setToken(convoToken);
    //     } else {
    //         setToken(null);
    //     }
    // }, [location.state]);

    useEffect(() => {
        if (fetchedConversation === false) {
            setFetchedConversation(true);
            dispatch(getConversation('s6bbPIcMPpkkXg0cBrdH3rMSTchDu4umHwNafQk4JR8', 'rl3rgi4NcZkpAEcacZnQ2VuOfJ0FxAqCRaKB_SwdZoQ='));
            console.log(messages);
        }
    }, [fetchedConversation, dispatch, id, token]);

    useEffect(() => {
        console.log('SWITCHEDDDD');
        setFetchedConversation(true);
        dispatch(getConversation('s6bbPIcMPpkkXg0cBrdH3rMSTchDu4umHwNafQk4JR8', 'rl3rgi4NcZkpAEcacZnQ2VuOfJ0FxAqCRaKB_SwdZoQ='));
        console.log(messages);
    }, [dispatch, id, token]);

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('you sent the following message: ', message);
        dispatch(sendMessage(parseInt(id), token, message));
        setFetchedConversation(false);
        console.log(messages);
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
                    <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto' }} />
                    <div className="messages-header-info">
                        Conversation ID {id} | User ID {messages.users.idB}
                    </div>
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