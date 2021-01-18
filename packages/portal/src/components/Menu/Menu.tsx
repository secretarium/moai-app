import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-white.png';
import { disconnect } from '../../actions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComment, faBarcode, faQrcode, faInfo, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import style from './Menu.module.css';
import { useTranslation } from 'react-i18next';


const Menu: React.FC = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={style.sidebar}>
            <div className={style.header}>
                <img src={Logo} alt="moai" />
            </div>
            <div className={style.options}>
                <NavLink exact className={style.option} to={'/'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faHome} />
                    <span>{t('APP_HOME')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/chat'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faComment} />
                    <span>{t('APP_CHAT')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/search/tested'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faBarcode} />
                    <span>{t('APP_SEARCH_TEST_ID')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/search/exposed'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faQrcode} />
                    <span>{t('APP_SEARCH_LOCATION_CODE')}</span>
                </NavLink>
                {/* <NavLink className={style.option} to={'/settings'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faCog}  />
                    <span>Settings</span>
                </NavLink> */}
                <NavLink className={style.option} to={'/about'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <FontAwesomeIcon icon={faInfo} style={{ width: '0.8rem' }} />
                    <span>{t('APP_ABOUT_MOAI')}</span >
                </NavLink>
                <br />
                <br />
                <br />
                <NavLink className={style.option} to={'/'} onClick={() => dispatch(disconnect())} >
                    <FontAwesomeIcon icon={faPowerOff} />
                    <span>{t('APP_LOGOUT')}</span >
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;