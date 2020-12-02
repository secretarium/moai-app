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
    conversationLastMessageList: s.conversations.conversationLastMessageList,
    newMessage: s.conversations.newMessage
}), ({ address, token, index, newMessage, conversationLastMessageList, dispatch }) => {

    const [fetchedInfo, setFetchedInfo] = useState(false);

    useEffect(() => {
        if (newMessage === true) {
            setFetchedInfo(false);
        }
    }, [newMessage]);

    useEffect(() => {
        if (fetchedInfo === false && conversationLastMessageList[index]) {
            dispatch(getLastMessage(address, token));
            setFetchedInfo(true);
        }
    }, [address, token, fetchedInfo, conversationLastMessageList, index, dispatch]);

    return (
        <>
            <Link className="contact" to={{
                pathname: `/chat/${address}`,
                state: { address: address, token: token }
            }}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginBottom: '15px' }} />
                <div className="contact-info">
                    <h2>ID</h2>
                    {(fetchedInfo === true && conversationLastMessageList[index]) ?
                        <>
                            {((conversationLastMessageList[index].text).length > 16 ? `${(conversationLastMessageList[index].text).slice(0, 17).trim()}...` : conversationLastMessageList[index].text)}
                            <p className="contact-info-timestamp">{toDateTime(conversationLastMessageList[index].datetime)}</p>
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