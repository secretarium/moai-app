import React from 'react';
import './Sidebar.css';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SidebarChats from './SidebarChats';


const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="header">
                <UserOutlined style={{ fontSize: '30px', color: '#fff' }} />
                <MoreOutlined style={{ fontSize: '26px', color: '#fff' }} />
            </div>
            <div className="search">
                <div className="search-container">
                    <SearchOutlined style={{ fontSize: '24px', color: 'gray', padding: '10px' }} />
                    <input placeholder="Search..." type="text" style={{ outline: 'none', border: 'none' }} />
                </div>
            </div>
            <div className="chats">
                <SidebarChats />
            </div>
        </div>
    );
};

export default Sidebar;
