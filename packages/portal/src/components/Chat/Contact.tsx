import React, { useEffect, useState } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';
import { withState } from '../../store';
import { getLastMessage } from '../../actions';


type ContactProps = {
    address: string;
    token: string;
};

const Contact = withState<ContactProps>()((s) => ({
    conversationLastMessageList: s.conversations.conversationLastMessageList
}), ({ address, token, conversationLastMessageList, dispatch }) => {

    const [fetchedContact, setFetchedContact] = useState(false);

    useEffect(() => {
        if (fetchedContact === false) {
            dispatch(getLastMessage(address, token));
            setFetchedContact(true);
        }
    }, [dispatch, fetchedContact, conversationLastMessageList, address, token]);

    return (
        <>
            <Link className="contact" to={{
                pathname: `/chat/${token}`,
                state: { address: address, token: token }
            }}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginBottom: '15px' }} />
                <div className="contact-info">
                    <h2>ID</h2>
                    <p>Last message...</p>
                </div>
            </Link>
        </>
    );
});

export default Contact;