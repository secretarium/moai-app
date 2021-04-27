import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { version as packageVersion } from '../../../package.json';
import Hand from '../../assets/hand.png';
import MoaiLogo from '../../assets/logo-black.png';
import LoginRegister from './LoginRegister';
import LoginLanding from './LoginLanding';
import LoginSignin from './LoginSignin';
import style from './Login.module.css';
import { useTranslation } from 'react-i18next';


const Login: React.FC = () => {

    const history = useHistory();
    const { t } = useTranslation();

    return (
        <div className={style.containerMain}>
            <div className={style.containerLogin}>
                <img src={MoaiLogo} alt="moai logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
                <Switch>
                    <Route path="/login/register/:token?" component={LoginRegister} />
                    <Route path="/login/signin" component={LoginSignin} />
                    <Route component={LoginLanding} />
                </Switch>
                <Divider style={{ width: '70%', minWidth: '70%' }} />
                <p style={{ marginBottom: 0 }}>{t('APP_DONT_HAVE_AN_ACCOUNT')}
                    <Button type="link" style={{ padding: 0 }} onClick={(): void => {
                        history.push('/login/register');
                    }}>{t('APP_REGISTER_NEW_ACCOUNT')}</Button>
                </p>
                <span>
                    Moai © {new Date().getFullYear()} - {t('APP_POWERED_BY')}{' '}
                    <a href="https://secretarium.com" rel="noopener noreferrer" target="_blank">
                        Secretarium
                    </a> - <em>{`v${packageVersion}`}</em>
                </span>
            </div>
            <div className={style.hand}>
                <img src={Hand} alt="moai app" />
            </div>
        </div>
    );
};


export default Login;
