import React, { useEffect, useState } from 'react';
import { withState } from '../../store';
import { Button, Input, Form, Alert } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { connect, clearTracerErrors, login } from '../../actions';


type LocationTypes = {
    email: string;
};

const LoginSignin = withState()(
    (s) => ({
        keyPairs: s.vault.keyPairs,
        loginError: s.tracer.loginError,
        isVerified: s.tracer.isVerified
    }),
    ({ keyPairs, loginError, isVerified, dispatch }) => {

        const location = useLocation<LocationTypes>();
        const history = useHistory();
        const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);
        const [currentKey] = useState(keyPairs.find(key => key.name === location.state.email));

        useEffect(() => {
            if (loginError && errorMessage !== loginError) {
                setIsLoggingIn(false);
                setErrorsClear(true);
                setErrorMessage(loginError);
            }
        }, [errorMessage, loginError]);

        useEffect(() => {
            if (isVerified === true && isLoggingIn === true) {
                dispatch(login());
            } else if (isVerified === false) {
                history.push({
                    pathname: '/login/validate',
                    state: { email: currentKey.name }
                });
            }
        }, [isVerified, isLoggingIn, dispatch, history, currentKey]);

        const handleLogin = (values: any): void => {
            setIsLoggingIn(true);
            setErrorMessage(undefined);
            dispatch(connect(currentKey, currentKey.name, values.password));
        };

        const clearErrors = (): void => {
            if (errorsClear) {
                setErrorMessage(undefined);
                dispatch(clearTracerErrors());
                setErrorsClear(false);
            }
        };

        return (
            <>
                <h1>Welcome back</h1>
                <Form className="form" name="registration" onFinish={handleLogin}>
                    <Input defaultValue={currentKey?.name} value={currentKey?.name} />
                    <br />
                    <br />
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder="Password" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoggingIn} style={{ backgroundColor: '#00b0ee', width: '120px' }}>
                            Connect
                        </Button>
                        {/* <Button.Group>
                            <Button>Forgot my password</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button>Use a different account</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        </Button.Group> */}
                    </Form.Item>
                </Form>
                {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
            </>
        );
    });

export default LoginSignin;
