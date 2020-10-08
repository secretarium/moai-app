import React from 'react';
import './SidebarChats.css';
import UserOutlined from '@ant-design/icons/UserOutlined';


const SidebarChats: React.FC = () => {
    return (
        <div className="sidebarChats">
            <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
            <div className="sidebarChats-info">
                <h2>ID number</h2>
                <p>Last message...</p>
            </div>
        </div>
    );
};

export default SidebarChats;
