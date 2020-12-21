import React, { useState, useEffect } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';
import { withState } from '../../store';
import { toDateTime } from '../../utils/timeHandler';
import { getLastMessage } from '../../actions';


type ContactProps = {
    address: string;
    token: string;
};

const Contact = withState<ContactProps>()((s) => ({
    lastMessages: s.conversations.lastMessages
}), ({ address, token, lastMessages, dispatch }) => {

    const [messageText, setMessageText] = useState<string>();
    const [messageTime, setMessageTime] = useState<number>();
    const [hasFetchedLastMessage, setHasFetchedLastMessage] = useState(false);

    useEffect(() => {
        if (hasFetchedLastMessage === false) {
            setHasFetchedLastMessage(true);
            console.log('address contact', address);
            dispatch(getLastMessage(address, token));
        }
    }, []);

    useEffect(() => {
        if (hasFetchedLastMessage === true) {
            const message = lastMessages.find(msg => msg.address === address);
            if (message !== undefined) {
                setMessageText(message.lastMessage.text);
                setMessageTime(message.lastMessage.datetime);
            } else {
                setMessageText('');
                setMessageTime(0);
            }
        }
    }, [lastMessages, address, hasFetchedLastMessage]);

    return (
        <>
            <Link className="contact" to={{
                pathname: `/chat/${address}`,
                state: { address: address, token: token }
            }}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginBottom: '15px' }} />
                <div className="contact-info">
                    <h2>ID {address.slice(0, 8)}</h2>
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