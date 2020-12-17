import React from 'react';
import './Message.css';
import { toDateTime } from '../../utils/timeHandler';

type Props = {
    message: MoaiPortal.Message
};

const Message: React.FC<Props> = ({ message }) => {
    return (
        <p className={`message-bubble ${message.sender === 0 && 'message-sender'}`}>
            <span className="message-name">{message.sender === 0 ? 'You' : 'Moai User'}</span>
            {message.text}
            <span className="message-timestamp">{toDateTime(message.datetime)}</span>
        </p>
    );
};

export default Message;