import React from 'react';
import './SidebarChatList.css';
import UserOutlined from '@ant-design/icons/UserOutlined';


const SidebarChatList: React.FC = () => {
    return (
        <div className="sidebarChatList">
            <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
            <div className="sidebarChatList-info">
                <h2>ID number</h2>
                <p>Last message...</p>
            </div>
        </div>
    );
};

export default SidebarChatList;