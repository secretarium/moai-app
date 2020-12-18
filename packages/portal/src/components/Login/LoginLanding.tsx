import React from 'react';
import { withState } from '../../store';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { KeyOutlined } from '@ant-design/icons';
import style from './Login.module.css';


const LoginLanding = withState()(
    (s) => ({
        keyPairs: s.vault.keyPairs
    }),
    ({ keyPairs }) => {

        const history = useHistory();

        return (
            <>
                <h1>Login to Moai Portal</h1>
                {keyPairs?.length > 0
                    ? <>
                        <p>Please choose the account you want to log into.</p>
                        {keyPairs.map((keyPair, index) => <React.Fragment key={index}>
                            <Button icon={<KeyOutlined translate={{}} />} className={style.keyName} onClick={(): void => {
                                history.push({
                                    pathname: '/login/signin',
                                    state: { email: keyPair.name }
                                });
                            }}>{keyPair.name}</Button>
                        </React.Fragment>
                        )}
                    </>
                    : <>
                        <p>There is no account currently setup on this device.</p>
                        <Button type="primary" style={{ backgroundColor: '#00b0ee', width: '120px' }} onClick={(): void => {
                            history.push('/login/register');
                        }}>Register</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    </>
                }
            </>
        );
    });

export default LoginLanding;
