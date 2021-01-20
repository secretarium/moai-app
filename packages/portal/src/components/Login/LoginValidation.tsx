import React, { useState, useEffect } from 'react';
import { withState } from '../../store';
import { Button, Input, Form, Alert } from 'antd';
import { verifyTracer, clearTracerErrors, sendNewValidationCode } from '../../actions';
import { useLocation, useHistory } from 'react-router-dom';
import { EncryptedKeyPair } from '@secretarium/connector';
import { useTranslation } from 'react-i18next';


type LocationTypes = {
    email: string;
};

const LoginValidation = withState()(
    (s) => ({
        validationError: s.tracer.validationError,
        registrationError: s.tracer.registrationError,
        challengeError: s.tracer.challengeError,
        keyPairs: s.vault.keyPairs
    }),
    ({ dispatch, validationError, registrationError, challengeError, keyPairs }) => {

        const location = useLocation<LocationTypes>();
        const history = useHistory();
        const { t } = useTranslation();
        const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
        const [errorsClear, setErrorsClear] = useState<boolean>(false);
        const [isValidating, setIsValidating] = useState(false);
        const [isSendingCode, setIsSendingCode] = useState(false);
        const [currentKey, setCurrentKey] = useState<EncryptedKeyPair | undefined>(keyPairs.find(key => key.name === location.state.email));

        useEffect(() => {
            setCurrentKey(keyPairs.find(key => key.name === location.state.email));
        }, [keyPairs, location]);

        useEffect(() => {
            if (validationError && errorMessage !== validationError) {
                setIsValidating(false);
                setErrorsClear(true);
                setErrorMessage(validationError);
            }

            if (challengeError && errorMessage !== challengeError) {
                setIsValidating(false);
                setErrorsClear(true);
                setErrorMessage(challengeError);
            }

            if (registrationError) {
                setIsValidating(false);
                history.push('/login/register');
            }

        }, [validationError, registrationError, challengeError, errorMessage, currentKey, location, keyPairs, history]);

        const handleValidate = (values: any): void => {
            setIsValidating(true);
            setErrorMessage(undefined);
            dispatch(verifyTracer(values.code.trim()));
        };

        const clearErrors = (): void => {
            if (errorsClear) {
                setErrorMessage(undefined);
                dispatch(clearTracerErrors());
                setErrorsClear(false);
            }
        };

        const resendCode = (): void => {
            setIsSendingCode(true);
            dispatch(sendNewValidationCode())
                .then(() => {
                    setIsSendingCode(false);
                });
        };

        return (
            <>
                <h1>{t('APP_EMAIL_VERIFICATION')}</h1>
                <p style={{ width: '85%' }}>{t('APP_SENT_VERIFICATION_CODE', { emailAddress: location.state.email })}</p>
                <Form name="validation" onFinish={handleValidate}>
                    <Form.Item name="code" rules={[{ required: true, message: t('APP_NO_VERIFICATION_ERROR') }]}>
                        <Input placeholder={t('APP_VERIFICATION_CODE')} onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item>
                        <Button.Group>
                            <Button loading={isSendingCode} onClick={(): void => resendCode()}>
                                {t('APP_RESEND_CODE')}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit" loading={isValidating} style={{ backgroundColor: '#00b0ee', width: '120px' }}>
                                {t('APP_VERIFY_EMAIL')}
                            </Button>
                        </Button.Group>
                    </Form.Item>
                </Form>
                {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
            </>
        );
    });

export default LoginValidation;
