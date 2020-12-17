import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../../assets/logout.png';
import Logo from '../../assets/logo-white.png';
import { disconnect } from '../../actions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComment, faBarcode, faQrcode, faInfo, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import style from './Menu.module.css';


const Menu: React.FC = () => {

    const dispatch = useDispatch();

    return (
        <div className={style.sidebar}>
            <div className={style.header}>
                <img src={Logo} alt="moai" />
            </div>
            <div className={style.options}>
                <NavLink exact className={style.option} to={'/'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faHome} />
                    <span>Home</span>
                </NavLink>
                <NavLink className={style.option} to={'/chat'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faComment} />
                    <span>Chat</span>
                </NavLink>
                <NavLink className={style.option} to={'/search/tested'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faBarcode} />
                    <span>Search Test ID</span>
                </NavLink>
                <NavLink className={style.option} to={'/search/exposed'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faQrcode} />
                    <span>Search Location Code</span>
                </NavLink>
                {/* <NavLink className={style.option} to={'/settings'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faCog}  />
                    <span>Settings</span>
                </NavLink> */}
                <NavLink className={style.option} to={'/about'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faInfo} style={{ width: '0.8rem' }} />
                    <span>About Moai</span >
                </NavLink>
                <br />
                <br />
                <br />
                <NavLink className={style.option} to={'/'} onClick={() => dispatch(disconnect())} >
                    <FontAwesomeIcon icon={faPowerOff} />
                    <span>Logout</span >
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;