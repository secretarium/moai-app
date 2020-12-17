import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { version as packageVersion } from '../../../package.json';
import Hand from '../../assets/hand.png';
import MoaiLogo from '../../assets/moai-logo.png';
import LoginRegister from './LoginRegister';
import LoginValidation from './LoginValidation';
import LoginLanding from './LoginLanding';
import LoginSignin from './LoginSignin';
import style from './Login.module.css';


const Login: React.FC = () => {

    const history = useHistory();

    return (
        <div className={style.containerMain}>
            <div className={style.containerLogin}>
                <img src={MoaiLogo} alt="moai logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
                <Switch>
                    <Route path="/login/register" component={LoginRegister} />
                    <Route path="/login/validate" component={LoginValidation} />
                    <Route path="/login/signin" component={LoginSignin} />
                    <Route component={LoginLanding} />
                </Switch>
                <Divider style={{ width: '70%', minWidth: '70%' }} />
                <p style={{ marginBottom: 0 }}>Don't have an account? You can <Button type="link" style={{ padding: 0 }} onClick={(): void => {
                    history.push('/login/register');
                }}>Register a new account</Button>.</p>
                <span>
                    Moai © {new Date().getFullYear()} - Powered by{' '}
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
