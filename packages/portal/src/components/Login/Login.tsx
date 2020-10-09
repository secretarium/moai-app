import React from 'react';
// import { withState } from '../../store';
// import { SCP, Key, Constants } from '@secretarium/moai-connect';
import './Login.css';
import { Button, Input, Form } from 'antd';

// const scp = new SCP();
// const isDev = process.env.NODE_ENV === 'development';

// const Login = withState()(
//     (s) => ({
//         localKey: s.system.localKey
//     }),
//     ({ dispatch, localKey }) => {

//         const [isConnected, setIsConnected] = useState(false);
//         const [isLoggingIn, setIsLoggingIn] = useState(false);
//         const [isRegistering, setIsRegistering] = useState(false);
//         const [isNew, setIsNew] = useState(false);
//         const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

//         useEffect(() => {
//             async function connectBackend() {
//                 if (localKey && scp.state === Constants.ConnectionState.closed) {
//                     Key.importKey(localKey.exportableKey).then((key) => {
//                         scp.connect('wss://future-url', key, 'knownTrustedKey').then(() => {
//                             setIsConnected(true);
//                         }).catch((error) => {
//                             setErrorMessage(isDev ? `Connection error: ${error?.message?.toString() ?? error?.toString()}` : 'Oops, a problem occured');
//                             setIsConnected(false);
//                             console.error(error);
//                         });
//                     });
//                 } else if (scp.state === Constants.ConnectionState.secure) {
//                     setIsConnected(true);
//                 }
//             }
//             if (!isConnected) {
//                 connectBackend();
//             }
//         }, [localKey, isConnected, errorMessage]);
const Login: React.FC = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container-login">
            <h1>Register to Moai Portal</h1>
            <Form className="form" name="registration" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
        </div>
    );
};

export default Login;
