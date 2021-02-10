import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-white.png';
import { disconnect } from '../../actions';
import { useDispatch } from 'react-redux';
import { MessageOutlined, HomeOutlined, QrcodeOutlined, BarcodeOutlined, TeamOutlined, InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
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
                    <HomeOutlined />
                    <span className={style.navOption}>{t('APP_HOME')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/chat'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <MessageOutlined />
                    <span className={style.navOption}>{t('APP_CHAT')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/search/tested'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <BarcodeOutlined />
                    <span className={style.navOption}>{t('APP_SEARCH_TEST_ID')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/search/exposed'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <QrcodeOutlined />
                    <span className={style.navOption}>{t('APP_SEARCH_LOCATION_CODE')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/admin'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <TeamOutlined />
                    <span className={style.navOption}>{t('APP_ADMIN')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/about'} style={{ color: '#8B8C9D' }} activeStyle={{ color: '#FAFCFC' }}>
                    <InfoCircleOutlined />
                    <span className={style.navOption}>{t('APP_ABOUT_MOAI')}</span>
                </NavLink>
                <NavLink className={style.option} to={'/'} onClick={() => dispatch(disconnect())}>
                    <LogoutOutlined />
                    <span className={style.navOption}>{t('APP_LOGOUT')}</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;