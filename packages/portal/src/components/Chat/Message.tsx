import React from 'react';
import style from './Message.module.css';

type Props = {
    username: string;
    message: string;
    timestamp: string;
    isSender: boolean;
};

const Message: React.FC<Props> = ({ username, message, timestamp, isSender }) => {
    return (
        <p className={`message-bubble ${isSender && 'message-sender'}`}>
            <span className={style.messageName}>{username}</span>
            {message}
            <span className={style.messageTimestamp}>{timestamp}</span>
        </p>
    );
};

export default Message;