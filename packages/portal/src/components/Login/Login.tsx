import React, { useState, useEffect } from 'react';
import './Login.css';
import { Button, Input, Form, Divider, Alert } from 'antd';
import { version as packageVersion } from '../../../package.json';
import { withState } from '../../store';
import { useHistory } from 'react-router-dom';
import Hand from '../../assets/hand.png';
import MoaiLogo from '../../assets/moai-logo.png';
import { connect, verifyTracer } from '../../actions/secretarium';


const Login = withState()(
    (s) => ({
        isVerified: s.principal.isVerified,
        validationEmailError: s.principal.validationEmailError
    }),
    ({ dispatch, validationEmailError, isVerified }) => {

        const history = useHistory();
        const [codeSent, setCodeSent] = useState(false);
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

        useEffect(() => {
            if (validationEmailError) {
                setErrorMessage(validationEmailError);
            }

            if (isVerified === true) {
                history.push('/');
            } else if (isVerified === false) {
                setErrorMessage('An error occurred');
            }
        }, [validationEmailError, isVerified, history]);

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const validateCode = (values: any): void => {
            dispatch(verifyTracer(values.code));
            console.log(isVerified);
        };

        const sendCode = (values: any): void => {
            console.log(`Code sent to ${values.email}`);
            setCodeSent(true);
            dispatch(connect(values.email));
        };

        // eslint-disable-next-line prefer-const
        let composition = null;
        if (codeSent === true) {
            composition =
                <Form className="form" name="registration" onFinish={validateCode} onFinishFailed={onFinishFailed}>
                    <Form.Item name="code" rules={[{ required: true, message: 'Please input the verification code!' }]}>
                        <Input placeholder="Verification Code" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee', borderRadius: '30px', width: '120px' }}>
                            Verify Code
                        </Button>
                    </Form.Item>
                </Form>;
        } else {
            composition =
                <Form className="form" name="registration" onFinish={sendCode} onFinishFailed={onFinishFailed}>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee', borderRadius: '30px', width: '120px' }}>
                            Get Code
                        </Button>
                    </Form.Item>
                </Form>;
        }

        return (
            <div className="container-main">
                <div className="container-login">
                    <img src={MoaiLogo} alt="moai logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
                    <h1>Register to Moai Portal</h1>
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
