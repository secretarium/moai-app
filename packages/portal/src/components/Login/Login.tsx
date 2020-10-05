import React from 'react';
import './Login.css';
import { Button, Input, Form } from 'antd';

const Login: React.FC = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <h1>Register to Moai Portal</h1>
            <Form name="registration" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email address!' }]}>
                    <Input placeholder="Email Address" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
