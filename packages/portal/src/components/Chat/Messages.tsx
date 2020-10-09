import React from 'react';
import './Messages.css';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';


const Messages: React.FC = () => {
    return (
        <div className="messages">
            <div className="messages-header">
                <div className="messages-header-info">
                    <h2>ID number</h2>
                </div>
                <MoreOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </div>
            <div className="messages-body">
                <p className="message-bubble">
                    <span className="message-name">nhs worker</span>
                    First message
                    <span className="message-timestamp">1:23 pm</span>
                </p>
                <p className="message-bubble message-sender">
                    <span className="message-name">nhs worker</span>
                    First message
                    <span className="message-timestamp">1:23 pm</span>
                </p>
            </div>
            <div className="messages-footer">
                <form>
                    <input type="text" placeholder="Type a new message" />
                    <button type="submit">Send message</button>
                </form>
                <SendOutlined style={{ fontSize: '24px', color: 'white', padding: '10px' }} />
            </div>
        </div>
    );
};

export default Messages;