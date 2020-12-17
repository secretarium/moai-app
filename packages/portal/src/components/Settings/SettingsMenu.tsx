import React from 'react';
import './SettingsMenu.css';
import { NavLink } from 'react-router-dom';
import MoaiPin from '../../assets/moai-pin.png';
import Contact from '../../assets/contact.png';
import Faq from '../../assets/faq.png';
import Legal from '../../assets/legal.png';
import Notifs from '../../assets/notifs.png';


const SettingsMenu: React.FC = () => {
    return (
        <div className="settings-bar">
            <div className="settings-bar-header">
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
                Settings
            </div>
            <div className="settings-bar-pages">
                <NavLink className="settings-page" to={'/settings/notifications'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <img src={Notifs} alt="notifications" style={{ width: '54px', height: 'auto', marginRight: '10px', marginBottom: '10px' }} />
                    Notifications
                </NavLink>
                <NavLink className="settings-page" to={'/settings/faq'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <img src={Faq} alt="faq" style={{ width: '54px', height: 'auto', marginRight: '10px', marginBottom: '10px' }} />
                    FAQ
                </NavLink>
                <NavLink className="settings-page" to={'/settings/contact'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <img src={Contact} alt="contact" style={{ width: '54px', height: 'auto', marginRight: '10px', marginBottom: '10px' }} />
                    Contact Us
                </NavLink>
                <NavLink className="settings-page" to={'/settings/legal'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#000' }}>
                    <img src={Legal} alt="legal" style={{ width: '50px', height: 'auto', marginRight: '14px', marginBottom: '10px' }} />
                    Terms &amp; Privacy Policy
                </NavLink>
            </div>
        </div>
    );
};

export default SettingsMenu;
