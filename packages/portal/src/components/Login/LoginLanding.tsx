import React from 'react';
import { withState } from '../../store';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { KeyOutlined } from '@ant-design/icons';
import style from './Login.module.css';
import { useTranslation } from 'react-i18next';


const LoginLanding = withState()(
    (s) => ({
        keyPairs: s.vault.keyPairs
    }),
    ({ keyPairs }) => {

        const history = useHistory();
        const { t } = useTranslation();

        return (
            <>
                <h1>{t('APP_LOGIN_ACCOUNT')}</h1>
                {keyPairs?.length > 0
                    ? <>
                        <p>{t('APP_CHOOSE_ACCOUNT')}</p>
                        {keyPairs.map((keyPair, index) => <React.Fragment key={index}>
                            <Button icon={<KeyOutlined />} className={style.keyName} onClick={(): void => {
                                history.push({
                                    pathname: '/login/signin',
                                    state: { username: keyPair.name }
                                });
                            }}>{keyPair.name}</Button>
                        </React.Fragment>
                        )}
                    </>
                    : <>
                        <p>{t('APP_NO_ACCOUNT')}</p>
                        <Button type="primary" style={{ backgroundColor: '#00b0ee', width: '120px' }} onClick={(): void => {
                            history.push('/login/register');
                        }}>{t('APP_REGISTER')}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    </>
                }
            </>
        );
    });

export default LoginLanding;
