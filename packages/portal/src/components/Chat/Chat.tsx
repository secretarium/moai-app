import React from 'react';
import Messages from './Messages';
import ContactsBar from './ContactsBar';


const Chat: React.FC = () => {
    return (
        <>
            <ContactsBar />
            <Messages />
        </>
    );
};

export default Chat;
