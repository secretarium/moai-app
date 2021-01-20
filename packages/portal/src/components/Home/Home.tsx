import React from 'react';
import style from './Home.module.css';
import { useTranslation } from 'react-i18next';


const Home: React.FC = () => {

    const { t } = useTranslation();

    return (
        <div className={style.containerHome}>
            <h1>{t('APP_WELCOME_TO_MOAI')}</h1>
            <p className={style.infoHome}>
                {t('APP_HOME_INFO')}
            </p>
            <p className={style.learnMoreHome}>
                {t('APP_LEARN_MORE')} <a target="_blank" rel="noopener noreferrer" href="https://moaiapp.com/">moaiapp.com</a>
            </p>
        </div >
    );
};

export default Home;
