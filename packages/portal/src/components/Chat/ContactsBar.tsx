import React from 'react';
import './ContactsBar.css';
import { Input } from 'antd';
import Contact from './Contact';
import { withState } from '../../store';

const { Search } = Input;


const ContactsBar = withState()((s) => ({
    conversationList: s.conversations.conversationList,
    messages: s.conversations.messages,
    lastMessage: s.conversations.lastMessage,
    newMessage: s.conversations.newMessage
}), ({ conversationList }) => {


    return (
        <div className="contacts-bar">
            <div className="search">
                <div className="search-container">
                    <Search placeholder="Search..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }} />
                </div>
            </div>
            <div className="chats">
                {conversationList.map((convo, index) =>
                    <Contact key={index} address={convo.address} token={convo.token} index={index} />
                )}
            </div>
        </div>
    );
});

export default ContactsBar;
