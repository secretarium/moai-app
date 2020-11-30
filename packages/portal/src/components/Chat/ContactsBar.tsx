import React, { useState, useEffect } from 'react';
import './ContactsBar.css';
import { Input } from 'antd';
import Contact from './Contact';
import { withState } from '../../store';

const { Search } = Input;


const ContactsBar = withState()((s) => ({
    conversationList: s.conversations.conversationList
}), ({ conversationList, dispatch }) => {

    const [fetchedContacts, setFetchedContacts] = useState(false);

    useEffect(() => {
        if (fetchedContacts === false && conversationList.length > 0) {
            setFetchedContacts(true);
        }
    }, [dispatch, fetchedContacts, conversationList]);

    return (
        <div className="contacts-bar">
            <div className="search">
                <div className="search-container">
                    <Search placeholder="Search..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }} />
                </div>
            </div>
            <div className="chats">
                {conversationList.map((convo) =>
                    <Contact key={convo.token} address={convo.address} token={convo.token} />
                )}
            </div>
        </div>
    );
});

export default ContactsBar;
