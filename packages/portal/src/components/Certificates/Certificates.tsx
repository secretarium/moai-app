import React, { useEffect } from 'react';
import { withState } from '../../store';
import { getImmunityCertificateRequests } from '../../actions';
import style from './Certificates.module.css';
import commonStyle from '../../Common.module.css';
import { useTranslation } from 'react-i18next';
import MoaiPin from '../../assets/moai-pin.png';
import Requester from './Requester';


const Certficiates = withState()(
    (s) => ({
        requesters: s.certificates.requesters
    }),
    ({ dispatch, requesters }) => {

        const { t } = useTranslation();

        useEffect(() => {
            dispatch(getImmunityCertificateRequests());
        }, []);

        return (
            <div className={commonStyle.container}>
                <div className={commonStyle.header}>
                    <img src={MoaiPin} alt="Moai pin" style={{ paddingRight: '10px' }} />
                    <h1>{t('APP_IMMUNITY_CERTIFICATES')}</h1>
                </div>
                <div className={style.results}>
                    {requesters !== null ? requesters.map(single => <Requester key={single} requesterId={single} />) : null}
                </div>
            </div >
        );
    }
);

export default Certficiates;