import React from 'react';
import style from './Message.module.css';
import { toDateTime } from '../../utils/timeHandler';

type Props = {
    message: MoaiPortal.Message
};

const Message: React.FC<Props> = ({ message }) => {

    let composition;
    if (message.sender === 0)
        composition = <p className={style.messageBubbleSender}>
            <span className={style.messageName}>You</span>
            {message.text}
            <span className={style.messageTimestamp}>{toDateTime(message.datetime)}</span>
        </p>;
    else
        composition = <p className={style.messageBubbleReceiver}>
            <span className={style.messageName}>Moai User</span>
            {message.text}
            <span className={style.messageTimestamp}>{toDateTime(message.datetime)}</span>
        </p>;
    return (
        <>
            { composition}
        </>
    );
};

export default Message;