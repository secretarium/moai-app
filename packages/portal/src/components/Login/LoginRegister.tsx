import React, { useState, useEffect } from 'react';
import { withState } from '../../store';
import { Button, Input, Form, Alert } from 'antd';
import { register, clearTracerErrors } from '../../actions';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const LoginRegister = withState()(
    (s) => ({
        registrationError: s.tracer.registrationError
    }),
    ({ dispatch, registrationError }) => {

        const history = useHistory();
        const { t } = useTranslation();
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);
        const [isRegistering, setIsRegistering] = useState<boolean>(false);

        useEffect(() => {
            if (registrationError && errorMessage !== registrationError) {
                setIsRegistering(false);
                setErrorsClear(true);
                setErrorMessage(registrationError);
            }
        }, [errorMessage, registrationError]);

        const handleRegister = (values: any): void => {
            setIsRegistering(true);
            dispatch(register(values.token, values.username, values.password));
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
                <h1>{t('APP_REGISTER_ACCOUNT')}</h1>
                <Form name="registration" onFinish={handleRegister}>
                    <Form.Item name="username" rules={[{ required: true, message: t('APP_NO_EMAIL_ERROR') }]}>
                        <Input placeholder={t('APP_USERNAME')} onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item name="token" rules={[{ required: true, message: t('APP_NO_EMAIL_ERROR') }]}>
                        <Input placeholder="Token" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: t('APP_NO_PASSWORD_ERROR') }]}>
                        <Input.Password placeholder={t('APP_PASSWORD')} onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item name="confirm" dependencies={['password']} rules={[
                        { required: true, message: t('APP_NO_CONFIRM_ERROR') },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(t('APP_WRONG_PASSWORD_ERROR'));
                            }
                        })
                    ]} hasFeedback>
                        <Input.Password autoComplete="new-password" placeholder={t('APP_CONFIRM_PASSWORD')} type="password" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item>
                        <Button.Group>
                            <Button onClick={() => {
                                history.push('/');
                                clearErrors();
                            }}>
                                {t('APP_GO_BACK')}
                            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" loading={isRegistering} htmlType="submit" style={{ backgroundColor: '#00b0ee', width: '120px' }}>
                                {t('APP_REGISTER')}
                            </Button>
                        </Button.Group>
                    </Form.Item>
                </Form>
                { errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
            </>
        );
    });

export default LoginRegister;
