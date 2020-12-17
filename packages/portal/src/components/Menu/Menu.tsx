import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../../assets/logout.png';
import Logo from '../../assets/logo-white.png';
import { disconnect } from '../../actions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComment, faBarcode, faQrcode, faInfo } from '@fortawesome/free-solid-svg-icons';
import style from './Menu.module.css';


const Menu: React.FC = () => {

    const dispatch = useDispatch();

    return (
        <div className={style.sidebar}>
            <div className={style.header}>
                {/** connection status */}
                <img src={Logo} alt="moai" style={{ width: '100px', height: 'auto' }} />
            </div>
            <div className={style.options}>
                <NavLink exact className={style.option} to={'/'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faHome} />
                    Home
                </NavLink>
                <NavLink className={style.option} to={'/chat'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faComment} />
                    Chat
                </NavLink>
                <NavLink className={style.option} to={'/search/tested'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faBarcode} />
                    Search Test ID
                </NavLink>
                <NavLink className={style.option} to={'/search/exposed'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faQrcode} />
                    Search Location Code
                </NavLink>
                {/* <NavLink className={style.option} to={'/settings'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faCog} />
                    Settings
                </NavLink> */}
                <NavLink className={style.option} to={'/about'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faInfo} />
                    About Moai
                </NavLink>
            </div>
            <NavLink className={style.logout} to={'/'} onClick={() => dispatch(disconnect())} style={{ color: '#fff' }}>
                <img src={Logout} alt="logout" style={{ width: '45px', height: 'auto', marginRight: '8px' }} /> Logout
            </NavLink>
        </div>
    );
};

export default Menu;