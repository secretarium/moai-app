import React from 'react';
import './Chat.css';
import Messages from './Messages';
import ContactsBar from './ContactsBar';
import Menu from '../Menu';


const Chat: React.FC = () => {
    return (
        <>
            <ContactsBar />
            <Messages />
        </>
    );
};

export default Chat;
