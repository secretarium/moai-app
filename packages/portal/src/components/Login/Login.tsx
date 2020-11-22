import React, { useState, useEffect } from 'react';
import './Login.css';
import { Button, Input, Form, Divider, Alert } from 'antd';
import { version as packageVersion } from '../../../package.json';
import { withState } from '../../store';
import { useHistory } from 'react-router-dom';
import Hand from '../../assets/hand.png';
import MoaiLogo from '../../assets/moai-logo.png';
import { connect, verifyTracer, register } from '../../actions';


const Login = withState()(
    (s) => ({
        isVerified: s.tracer.isVerified,
        validationEmailError: s.tracer.validationEmailError,
        keyPair: s.vault.keyPair
    }),
    ({ dispatch, validationEmailError, isVerified, keyPair }) => {

        const history = useHistory();
        const [codeSent, setCodeSent] = useState(false);
        const [currentKey] = useState(keyPair);
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasObtainedLocalKey, setHasObtainedLocalKey] = useState(false);
        const [password, setPassword] = useState<string>();
        const [email, setEmail] = useState<string>();

        useEffect(() => {
            if (validationEmailError) {
                setErrorMessage(validationEmailError);
            }

            if (isVerified === true) {
                history.push('/');
            } else if (isVerified === false) {
                setErrorMessage('An error occurred');
            }

            console.log(keyPair);
            console.log(currentKey);

            // if (!localKey && !hasRequestedLocalKey) {
            //     setHasRequestedLocalKey(true);
            //     dispatch(generateLocalKey())
            //         .then(() => {
            //             setHasObtainedLocalKey(true);
            //             console.log(localKey);
            //         })
            //         .catch((error) => console.error(error));
            // } else if (localKey) {
            //     console.log(localKey);
            //     setHasObtainedLocalKey(true);
            // }
        }, [validationEmailError, isVerified, history, keyPair, currentKey, dispatch, hasRequestedLocalKey]);

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const validateRegister = (values: any): void => {
            dispatch(verifyTracer(values.code));
        };

        const handleRegister = (values: any): void => {
            console.log(`Code sent to ${values.email}`);
            setCodeSent(true);
            setEmail(values.email);
            setPassword(values.password);
            dispatch(register(values.email, values.password));
        };

        const handleLogin = (values: any): void => {
            dispatch(connect(currentKey, values.email, values.password));
        };

        // eslint-disable-next-line prefer-const
        let composition = null;
        if (codeSent === true) {
            composition =
                <Form className="form" name="registration" onFinish={validateRegister} onFinishFailed={onFinishFailed}>
                    <Form.Item name="code" rules={[{ required: true, message: 'Please input the verification code!' }]}>
                        <Input placeholder="Verification Code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee', borderRadius: '30px', width: '120px' }}>
                            Verify Code
                        </Button>
                    </Form.Item>
                </Form>;
        } else if (currentKey) {
            composition =
                <Form className="form" name="registration" onFinish={handleLogin} onFinishFailed={onFinishFailed}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee', borderRadius: '30px', width: '120px' }}>
                            Connect
                        </Button>
                    </Form.Item>
                </Form>;
        } else {
            composition =
                <Form className="form" name="registration" onFinish={handleRegister} onFinishFailed={onFinishFailed}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input a password for your account!' }]}>
                        <Input.Password placeholder="Password" />
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
                        <Input.Password autoComplete="new-password" placeholder="Confirm Password" type="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee', borderRadius: '30px', width: '120px' }}>
                            Get Code
                        </Button>
                    </Form.Item>
                </Form>;
        }

        // if (!hasObtainedLocalKey)
        //     return <div>Loading local key...</div>;

        return (
            <div className="container-main">
                <div className="container-login">
                    <img src={MoaiLogo} alt="moai logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
                    <h1>{(currentKey && !codeSent) ? 'Welcome back to Moai Portal' : 'Register to Moai Portal'}</h1>
                    {composition}
                    {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
                    <Divider style={{ width: '70%', minWidth: '70%' }} />
                    <span>
                        Moai © {new Date().getFullYear()} - Powered by{' '}
                        <a href="https://secretarium.com" rel="noopener noreferrer" target="_blank">
                            Secretarium
                        </a> - <em>{`v${packageVersion}`}</em>
                    </span>
                </div>
                <div className="hand">
                    <img src={Hand} alt="moai app" />
                </div>
            </div>
        );
    });


export default Login;
