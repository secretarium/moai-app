import React, { useState, useEffect } from 'react';
import { withState } from '../../store';
import { Button, Input, Form, Alert } from 'antd';
import { verifyTracer, clearTracerErrors, challengeTracer } from '../../actions';
import { useLocation, useHistory } from 'react-router-dom';
import { EncryptedKeyPair } from '@secretarium/connector';


type LocationTypes = {
    email: string;
};

const LoginValidation = withState()(
    (s) => ({
        validationError: s.tracer.validationError,
        registrationError: s.tracer.registrationError,
        keyPairs: s.vault.keyPairs
    }),
    ({ dispatch, validationError, registrationError, keyPairs }) => {

        const location = useLocation<LocationTypes>();
        const history = useHistory();
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

            if (registrationError) {
                setIsValidating(false);
                history.push('/login/register');
            }

        }, [validationError, registrationError, errorMessage, currentKey, location, keyPairs, history]);

        const handleValidate = (values: any): void => {
            setIsValidating(true);
            setErrorMessage(undefined);
            dispatch(verifyTracer(values.code));
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
            dispatch(challengeTracer())
                .then(() => {
                    setIsSendingCode(false);
                });
        };

        return (
            <>
                <h1>Email address verification</h1>
                <p style={{ width: '85%' }}>{`We have sent a verification code to ${location.state.email}. Enter it here and press 'Verify Email'.`}</p>
                <Form className="form" name="registration" onFinish={handleValidate}>
                    <Form.Item name="code" rules={[{ required: true, message: 'Please input the verification code!' }]}>
                        <Input placeholder="Verification Code" onChange={(): void => clearErrors()} />
                    </Form.Item>
                    <Form.Item>
                        <Button.Group>
                            <Button loading={isSendingCode} onClick={() => {
                                resendCode();
                            }}>Resend Code</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit" loading={isValidating} style={{ backgroundColor: '#00b0ee', width: '120px' }}>
                                Verify Email
                            </Button>
                        </Button.Group>
                    </Form.Item>
                </Form>
                {errorMessage ? <><Alert message={errorMessage} type="error" /><br /></> : null}
            </>
        );
    });

export default LoginValidation;
