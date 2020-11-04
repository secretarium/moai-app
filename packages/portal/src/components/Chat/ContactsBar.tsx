import React, { useState, useEffect } from 'react';
import './ContactsBar.css';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Contact from './Contact';
import { withState } from '../../store';
import { getConversations } from 'actions/secretarium';


const ContactsBar = withState()((s) => ({
    conversationList: s.conversations.conversationList
}), ({ conversationList, dispatch }) => {

    const [fetchedContacts, setFetchedContacts] = useState(false);

    useEffect(() => {
        if (fetchedContacts === false) {
            setFetchedContacts(true);
            dispatch(getConversations);
            console.log(conversationList);
        }
    }, [dispatch, fetchedContacts]);

    return (
        <div className="contacts-bar">
            <div className="search">
                <div className="search-container">
                    <SearchOutlined style={{ fontSize: '24px', color: '#dfe0e2', padding: '10px' }} />
                    <input placeholder="Search..." type="text" style={{ outline: 'none', border: 'none' }} />
                </div>
            </div>
            <div className="chats">
                {conversationList.map((convo) =>
                    <Contact conversationID={convo.id} token={convo.token} />
                )}
            </div>
        </div>
    );
});

export default ContactsBar;
