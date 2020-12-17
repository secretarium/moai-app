import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';
import { withState } from '../../store';
import { toDateTime } from '../../utils/timeHandler';
import { getLastMessage } from '../../actions';
import style from './Contact.module.css';


type ContactProps = {
    address: string;
    token: string;
    index: number;
};

const Contact = withState<ContactProps>()((s) => ({
    lastMessage: s.conversations.lastMessage,
    newMessage: s.conversations.newMessage
}), ({ address, token, index, newMessage, lastMessage, dispatch }) => {

    const [fetchedInfo, setFetchedInfo] = useState(false);

    useEffect(() => {
        if (newMessage === true) {
            setFetchedInfo(false);
        }
    }, [newMessage]);

    useEffect(() => {
        if (fetchedInfo === false && lastMessage[index]) {
            dispatch(getLastMessage(address, token));
            setFetchedInfo(true);
        }
    }, [address, token, fetchedInfo, lastMessage, index, dispatch]);

    return (
        <>
            <Link className={style.contact} to={{
                pathname: `/chat/${address}`,
                state: { address: address, token: token }
            }}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginBottom: '15px' }} />
                <div className={style.contactInfo}>
                    <h2>ID {address.slice(0, 8)}</h2>
                    {(fetchedInfo === true && lastMessage[index]) ?
                        <>
                            {lastMessage[index].text}
                            <p className={style.contactInfoTimestamp}>{(lastMessage[index].datetime ? toDateTime(lastMessage[index].datetime) : 'New chat')}</p>
                        </> :
                        <>
                            {' '}
                            <p className={style.contactInfoTimestamp}>{' '}</p>
                        </>}
                </div>
            </Link>
        </>
    );
});

export default Contact;