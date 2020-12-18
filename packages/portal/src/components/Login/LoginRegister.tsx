import React, { useState, useEffect } from 'react';
import { withState } from '../../store';
import { Button, Input, Form, Alert } from 'antd';
import { register, clearTracerErrors } from '../../actions';
import { useHistory } from 'react-router-dom';


const LoginRegister = withState()(
    (s) => ({
        registrationError: s.tracer.registrationError
    }),
    ({ dispatch, registrationError }) => {

        const history = useHistory();
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);
        const [isRegistering, setIsRegistering] = useState<boolean>(false);
        const [email, setEmail] = useState<string>();
        const [goToValidate, setGoToValidate] = useState<boolean>(false);

        useEffect(() => {
            if (registrationError && errorMessage !== registrationError) {
                setIsRegistering(false);
                setErrorsClear(true);
                setErrorMessage(registrationError);
            }
        }, [errorMessage, registrationError]);

        useEffect(() => {
            if (goToValidate && isRegistering) {
                history.push({
                    pathname: '/login/validate',
                    state: { email: email }
                });
            }
        }, [email, history, goToValidate, isRegistering]);

        const handleRegister = (values: any): void => {
            setEmail(values.email);
            setIsRegistering(true);
            dispatch(register(values.email, values.password))
                .then(() => {
                    if (errorMessage === undefined) {
                        setGoToValidate(true);
                    }
                })
                .catch((error: any) => {
                    setErrorMessage(error);
                    setGoToValidate(false);
                });
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
                <h1>Register to Moai Portal</h1>
                <Form name="registration" onFinish={handleRegister}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                        <Input placeholder="Email Address" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input a password for your account!' }]}>
                        <Input.Password placeholder="Password" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item name="confirm" dependencies={['password']} rules={[
                        { required: true, message: 'Please confirm the password for your account!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            }
                        })
                    ]} hasFeedback>
                        <Input.Password autoComplete="new-password" placeholder="Confirm Password" type="password" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item>
                        <Button.Group>
                            <Button onClick={() => {
                                history.push('/');
                                clearErrors();
                            }}>
                                Go back
                            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" loading={isRegistering} htmlType="submit" style={{ backgroundColor: '#00b0ee', width: '120px' }}>
                                Register
                            </Button>
                        </Button.Group>
                    </Form.Item>
                </Form>
                { errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
            </>
        );
    });

export default LoginRegister;
