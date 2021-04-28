import React, { useEffect, useState } from 'react';
import { withState } from '../../store';
import { Button, Input, Form, Alert } from 'antd';
import { useLocation } from 'react-router-dom';
import { connect, clearTracerErrors } from '../../actions';
import { useTranslation } from 'react-i18next';


type LocationTypes = {
    /**
     * User's selected username
     */
    username: string;
};

const LoginSignin = withState()(
    (s) => ({
        keyPairs: s.vault.keyPairs,
        loginError: s.principal.loginError
    }),
    ({ keyPairs, loginError, dispatch }) => {

        const location = useLocation<LocationTypes>();
        const { t } = useTranslation();
        const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);
        const [currentKey] = useState(keyPairs.find(key => key.name === location.state.username));

        useEffect(() => {
            if (loginError && errorMessage !== loginError) {
                setIsLoggingIn(false);
                setErrorsClear(true);
                setErrorMessage(loginError);
            }
        }, [errorMessage, loginError]);

        const handleLogin = (values): void => {
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
                <h1>{t('APP_WELCOME_BACK')}</h1>
                <Form name="signin" onFinish={handleLogin}>
                    <Input defaultValue={currentKey?.name} value={currentKey?.name} />
                    <br />
                    <br />
                    <Form.Item name="password" rules={[{ required: true, message: t('APP_NO_PASSWORD_ERROR') }]} >
                        <Input.Password placeholder={t('APP_PASSWORD')} onChange={(): void => clearErrors()} autoFocus />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoggingIn} style={{ backgroundColor: '#00b0ee', width: '120px' }}>
                            {t('APP_CONNECT')}
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
