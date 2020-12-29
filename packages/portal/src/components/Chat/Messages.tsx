import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import Message from './Message';
import { useLocation, useParams } from 'react-router-dom';
import { withState } from '../../store';
import { getConversation, sendMessage } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import MoaiPin from '../../assets/moai-pin.png';
import style from './Messages.module.css';

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
        dispatch(sendMessage(conversation.address, conversation.token, message));
        setMessage('');
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    let composition = null;
    if (location.state === null || location.state === undefined)
        composition =
            <div className={style.messagesNoChat}>
                <h1>Start chatting</h1>
            </div>;
    else
        composition =
            <>
                <div className={style.messagesHeader}>
                    <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto' }} />
                    <div className={style.messagesHeaderInfo}>
                        ID {location.state.address.slice(0, 8)}
                    </div>
                </div>
                <div className={style.messagesBody}>
                    {messages.map((singleMessage, index) => {
                        return <Message key={index} message={singleMessage} />;
                    })}
                </div>
                <div className={style.messagesFooter}>
                    <form>
                        <input value={message} onChange={onChange} type="text" placeholder="Type a new message..." />
                        <button onClick={onClick} type="submit">Send message</button>
                    </form>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </>;

    return (
        <div className={style.messages}>
            {composition}
        </div>
    );
});

export default Messages;