import React from 'react';
import './SettingsMenu.css';
import { NavLink } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';


const SettingsMenu: React.FC = () => {
    return (
        <div className="settings-bar">
            <div className="settings-bar-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', paddingRight: '10px' }} />
                Settings
            </div>
            <div className="settings-bar-pages">
                <NavLink className="settings-page" to={'/settings/notifications'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <i className="far fa-bell fa-3x" style={{ padding: '10px' }} />
                    Notifications
                </NavLink>
                <NavLink className="settings-page" to={'/settings/faq'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <i className="far fa-question-circle fa-3x" style={{ padding: '10px' }} />
                    FAQ
                </NavLink>
                <NavLink className="settings-page" to={'/settings/contact'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <i className="fas fa-headset fa-3x" style={{ padding: '10px' }} />
                    Contact Us
                </NavLink>
                <NavLink className="settings-page" to={'/settings/legal'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <i className="far fa-file-alt fa-3x" style={{ padding: '16px', paddingBottom: '10px' }} />
                    Terms & Privacy Policy
                </NavLink>
            </div>
        </div>
    );
};

export default SettingsMenu;
