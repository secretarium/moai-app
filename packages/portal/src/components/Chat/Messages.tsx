import React, { useState, MouseEvent, ChangeEvent } from 'react';
import './Messages.css';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
import Message from './Message';


const Messages: React.FC = () => {
    const [message, setMessage] = useState('');

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('you sent the following message: ', message);
        setMessage('');
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <div className="messages">
            <div className="messages-header">
                <div className="messages-header-info">
                    <h2>ID number</h2>
                </div>
                <MoreOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </div>
            <div className="messages-body">
                <Message username="ID 1234" message="Hello there" timestamp="1:23 pm" isSender={false} />
                <Message username="nhs worker" message="Hi" timestamp="1:24 pm" isSender={true} />
            </div>
            <div className="messages-footer">
                <form>
                    <input value={message} onChange={onChange} type="text" placeholder="Type a new message" />
                    <button onClick={onClick} type="submit">Send message</button>
                </form>
                <SendOutlined style={{ fontSize: '24px', color: 'white', padding: '10px' }} />
            </div>
        </div>
    );
};

export default Messages;