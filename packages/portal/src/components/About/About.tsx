import React, { useEffect, useState } from 'react';
import { version as packageVersion } from '../../../package.json';
import ReactMarkdown from 'react-markdown';
import style from './About.module.css';
import { useTranslation } from 'react-i18next';


const About: React.FC = () => {

    const { t } = useTranslation();
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [disclaimer, setDisclaimer] = useState<string>('Loading');

    useEffect(() => {
        if (!hasFetched) {
            fetch('/disclaimer.txt')
                .then((result) => result.text())
                .then(text => setDisclaimer(text))
                .catch(() => setDisclaimer('An error occured'));
            setHasFetched(true);
        }
    }, [hasFetched]);

    return (
        <div className={style.containerAbout}>
            <h1>{`${t('APP_ABOUT_MOAI')} v${packageVersion}`}</h1>
            <div>
                <p>
                    {t('APP_ABOUT_MOAI_INFO_P1')}
                </p>
            </div>
            <div>
                <p>
                    {t('APP_ABOUT_MOAI_INFO_P2')}
                </p>
                <h2>{t('APP_EXTERNAL_LICENSES')}</h2>
                <div className={style.licenses}>
                    <ReactMarkdown source={disclaimer} />
                </div>
            </div>
        </div>
    );
};

export default About;
