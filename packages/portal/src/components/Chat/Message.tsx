import React from 'react';
import './Message.css';

interface Props {
    username: string,
    message: string,
    timestamp: string,
    isSender: boolean
}

const Message: React.FC<Props> = ({ username, message, timestamp, isSender }) => {
    return (
        <p className={`message-bubble ${isSender && 'message-sender'}`}>
            <span className="message-name">{username}</span>
            {message}
            <span className="message-timestamp">{timestamp}</span>
        </p>
    );
};

export default Message;