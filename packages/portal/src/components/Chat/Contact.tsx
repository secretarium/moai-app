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
    index: number;
};

const Contact = withState<ContactProps>()((s) => ({
    lastMessage: s.conversations.lastMessage
}), ({ address, token, index, lastMessage, dispatch }) => {

    const [hasFetchedLastMessage, setHasFetchedLastMessage] = useState(false);

    useEffect(() => {
        if (hasFetchedLastMessage === false) {
            setHasFetchedLastMessage(true);
            dispatch(getLastMessage(address, token));
        }
    }, []);

    return (
        <>
            <Link className="contact" to={{
                pathname: `/chat/${address}`,
                state: { address: address, token: token }
            }}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginBottom: '15px' }} />
                <div className="contact-info">
                    <h2>ID {address.slice(0, 8)}</h2>
                    {(hasFetchedLastMessage && lastMessage) ?
                        <>
                            {lastMessage.text}
                            <p className="contact-info-timestamp">{(lastMessage.datetime ? toDateTime(lastMessage.datetime) : 'New chat')}</p>
                        </> :
                        <>
                            {' '}
                            <p className="contact-info-timestamp">{' '}</p>
                        </>}
                </div>
            </Link>
        </>
    );
});

export default Contact;