import React from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import Logout from '../../assets/logout.png';
import Logo from '../../assets/logo-white.png';
import { disconnect } from '../../actions';
import { useDispatch } from 'react-redux';


const Menu: React.FC = () => {

    const dispatch = useDispatch();

    const onClick = (): void => {
        dispatch(disconnect());
    };

    return (
        <div className="sidebar">
            <div className="header">
                {/** connection status */}
                <img src={Logo} alt="moai" style={{ width: '100px', height: 'auto' }} />
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
                <NavLink className="option" to={'/search/tested'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-barcode fa-lg" style={{ paddingRight: '10px' }} />
                    Search Test ID
                </NavLink>
                <NavLink className="option" to={'/search/exposed'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-qrcode fa-lg" style={{ paddingRight: '13px' }} />
                    Search Location Code
                </NavLink>
                {/* <NavLink className="option" to={'/settings'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-cog fa-lg" style={{ paddingRight: '10px' }} />
                    Settings
                </NavLink> */}
                <NavLink className="option" to={'/about'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <i className="fas fa-info-circle fa-lg" style={{ paddingRight: '10px' }} />
                    About Moai
                </NavLink>
            </div>
            <NavLink className="logout" to={'/'} onClick={onClick} style={{ color: '#fff' }}>
                <img src={Logout} alt="logout" style={{ width: '45px', height: 'auto', marginRight: '8px' }} /> Logout
            </NavLink>
        </div>
    );
};

export default Menu;