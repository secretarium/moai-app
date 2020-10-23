import React from 'react';
import './Menu.css';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import { Link } from 'react-router-dom';


const Menu: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="header">
                <i className="fas fa-user-circle fa-3x" style={{ color: '#203864' }} />
                <MoreOutlined style={{ fontSize: '38px', color: '#203864' }} />
            </div>
            <div className="options">
                <Link className="option" to={'/'} style={{ color: '#d7d8da' }}>
                    <i className="fas fa-home fa-2x" style={{ color: '#d7d8da', paddingRight: '15px' }} />
                    Home
                </Link>
                <Link className="option" to={'/chat'} style={{ color: '#d7d8da' }}>
                    <i className="fas fa-comments fa-2x" style={{ color: '#d7d8da', paddingRight: '15px' }} />
                    Chat
                </Link>
                <Link className="option" to={'/search/barcode'} style={{ color: '#d7d8da' }}>
                    <i className="fas fa-barcode fa-2x" style={{ color: '#d7d8da', paddingRight: '15px' }} />
                    Search Barcode
                </Link>
                <Link className="option" to={'/search/qrcode'} style={{ color: '#d7d8da' }}>
                    <i className="fas fa-qrcode fa-2x" style={{ color: '#d7d8da', paddingRight: '20px' }} />
                    Search QRCode
                </Link>
                <Link className="option" to={'/'} style={{ color: '#d7d8da' }}>
                    <i className="fas fa-cog fa-2x" style={{ color: '#d7d8da', paddingRight: '15px' }} />
                    Settings
                </Link>
            </div>
            <Link className="logout" to={'/'} style={{ color: '#203864' }}>
                <i className="fas fa-sign-out-alt fa-2x" style={{ color: '#1ca8e1', paddingRight: '15px' }} /> Logout
            </Link>
        </div>
    );
};

export default Menu;