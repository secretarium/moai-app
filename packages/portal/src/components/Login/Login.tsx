import React, { useState } from 'react';
import './Login.css';
import { Button, Input, Form, Divider } from 'antd';
import { version as packageVersion } from '../../../package.json';
import { withState } from '../../store';
import { useHistory } from 'react-router-dom';


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
            history.push('/chat');
        };

        return (
            <div className="container-login">
                <h1>Register to Moai Portal</h1>
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
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00b0ee' }}>
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
        );
    });


export default Login;
