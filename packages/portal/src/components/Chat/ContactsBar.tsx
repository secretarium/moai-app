import React from 'react';
import { Input } from 'antd';
import Contact from './Contact';
import { withState } from '../../store';
import style from './ContactsBar.module.css';


const { Search } = Input;

const ContactsBar = withState()((s) => ({
    conversationList: s.conversations.conversationList
}), ({ conversationList }) => {

    return (
        <div className={style.contactsBar}>
            <div className={style.search}>
                <div className={style.searchContainer}>
                    <Search placeholder="Search..." style={{ outline: 'none', border: 'none', borderRadius: '25px' }} />
                </div>
            </div>
            <div className={style.chats}>
                {conversationList.map((convo, index) =>
                    <Contact key={index} address={convo.address} token={convo.token} />
                )}
            </div>
        </div>
    );
});

export default ContactsBar;
