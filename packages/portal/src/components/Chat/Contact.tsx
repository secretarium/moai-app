import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';
import { withState } from '../../store';
import { toDateTime } from '../../utils/timeHandler';
import style from './Contact.module.css';


type ContactProps = {
    conversation: MoaiPortal.Conversation
};

const Contact = withState<ContactProps>()((s) => ({
    lastMessages: s.conversations.lastMessages
}), ({ conversation, lastMessages }) => {

    const [messageText, setMessageText] = useState<string>();
    const [messageTime, setMessageTime] = useState<number>();

    useEffect(() => {
        const message = lastMessages.find(msg => msg.address === conversation.address);
        if (message === undefined || JSON.stringify(message.lastMessage) === '{}') {
            setMessageText('');
            setMessageTime(0);
        } else {
            setMessageText(message.lastMessage.text);
            setMessageTime(message.lastMessage.datetime);
        }

    }, [lastMessages, conversation.address]);

    return (
        <>
            <Link className={style.contact} to={{
                pathname: `/chat/${conversation.address}`,
                state: { address: conversation.address, token: conversation.token }
            }}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginBottom: '15px' }} />
                <div className={style.contactInfo}>
                    <h2>ID {conversation.address.slice(0, 8)}</h2>
                    {messageText}
                    <p className="contact-info-timestamp">
                        {(messageTime !== 0 ? toDateTime(messageTime) : 'New chat!')}
                    </p>
                </div>
            </Link>
        </>
    );
});

export default Contact;