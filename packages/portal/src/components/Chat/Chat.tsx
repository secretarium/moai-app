import React from 'react';
import './Chat.css';
import Sidebar from './Sidebar';
import Messages from './Messages';


const Chat: React.FC = () => {
    return (
        <div className="container">
            <Sidebar />
            <Messages />
        </div>
    );
};

export default Chat;
