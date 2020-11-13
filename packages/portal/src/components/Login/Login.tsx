import React, { useState } from 'react';
import './Login.css';
import { Button, Input, Form, Divider } from 'antd';
import { version as packageVersion } from '../../../package.json';
import { withState } from '../../store';
import { useHistory } from 'react-router-dom';
import Hand from '../../assets/hand.png';
import MoaiLogo from '../../assets/moai-logo.png';


const Login = withState()(
    (s) => ({
        localKey: s.principal.localKey
    }),
    ({ localKey, dispatch }) => {

        const history = useHistory();
        const [registrationValues, setRegistrationValues] = useState<{ [key: string]: string }>({});

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        const handleRegister = (values: any): void => {
            setRegistrationValues({
                email: values.email,
                password: values.password
            });
            history.push('/home');
        };

        return (
            <div className="container-main">
                <div className="container-login">
                    <img src={MoaiLogo} alt="moai logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
                    <h1>Register to Moai Portal</h1>
                    <Form className="form" name="registration" onFinish={handleRegister} onFinishFailed={onFinishFailed}>
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                            <Input placeholder="Email Address" />
                        </Form.Item>
                        <Form.Item name="firstname" rules={[{ required: true, message: 'Please input your email address!' }]}>
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item name="lastname" rules={[{ required: true, message: 'Please input your email address!' }]}>
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee', borderRadius: '30px', width: '120px' }}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
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
