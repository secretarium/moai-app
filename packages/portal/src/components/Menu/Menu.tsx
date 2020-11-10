import React from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import NHS from '../../assets/nhs.png';


const Menu: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="header">
                <img src={NHS} alt="NHS logo" style={{ width: '64px', height: 'auto', paddingRight: '10px' }} />
            </div>
            <div className="options">
                <NavLink exact className="option" to={'/'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-home fa-lg" style={{ paddingRight: '10px' }} />
                    Home
                </NavLink>
                <NavLink className="option" to={'/chat'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-comments fa-lg" style={{ paddingRight: '10px' }} />
                    Chat
                </NavLink>
                <NavLink className="option" to={'/search/barcode'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-barcode fa-lg" style={{ paddingRight: '10px' }} />
                    Search Test ID
                </NavLink>
                <NavLink className="option" to={'/search/qrcode'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-qrcode fa-lg" style={{ paddingRight: '13px' }} />
                    Search Venue Code
                </NavLink>
                <NavLink className="option" to={'/settings'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-cog fa-lg" style={{ paddingRight: '10px' }} />
                    Settings
                </NavLink>
            </div>
            <NavLink className="logout" to={'/'} style={{ color: '#fff' }}>
                <i className="fas fa-sign-out-alt fa-2x" style={{ color: '#25A9E1', paddingRight: '15px' }} /> Logout
            </NavLink>
        </div>
    );
};

export default Menu;