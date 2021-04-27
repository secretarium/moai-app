import React, { useEffect, useState } from 'react';
import MoaiPin from '../../assets/moai-pin.png';
import { toDateTime } from '../../utils/timeHandler';
import { useHistory } from 'react-router-dom';
import { createConversation, setTestResult, setNaturalImmunity } from '../../actions';
import { withState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import commonStyle from '../../Common.module.css';
import { Modal, Radio, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';


type SearchResultProps = {
    testId?: string;
    testType?: 'covidTest' | 'covidAntibodyTest';
    userId: string;
    time: number;
};

const SearchResult = withState<SearchResultProps>()((s) => ({
    newConversation: s.conversations.newConversation
}), ({ testType, testId, userId, time, newConversation, dispatch }) => {

    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [positive, setPositive] = useState(null);
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
    const [popConfirmLoading, setPopConfirmLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (newConversation) {
            history.push(`/chat/${newConversation.address}`);
        }
    }, [newConversation, history]);

    const onChange = (e): void => {
        setPositive(e.target.value);
    };

    const showModal = (): void => {
        setIsModalVisible(true);
    };

    const handleOkModal = (): void => {
        setModalConfirmLoading(true);
        testType === 'covidTest'
            ? dispatch(setTestResult(testId, positive, userId, testType))
                .then(() => {
                    setIsModalVisible(false);
                    setModalConfirmLoading(false);
                })
            : dispatch(setNaturalImmunity(testId))
                .then(() => {
                    setIsModalVisible(false);
                    setModalConfirmLoading(false);
                });
    };

    const handleCancelModal = (): void => {
        setIsModalVisible(false);
    };

    const handleOkPop = (): void => {
        setPopConfirmLoading(true);
        testType === 'covidTest'
            ? dispatch(createConversation('title', 'name', userId))
                .then(() => {
                    setPopConfirmLoading(false);
                })
            : setPopConfirmLoading(false);
    };

    return (
        <div className={commonStyle.searchResultContainer}>
            <div className={commonStyle.searchResultHeader}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
            </div>
            <div className={commonStyle.searchResultBody}>
                {`${t('APP_USER_ID')}: ${userId}`}
                <br></br>{t('APP_TIME')}: {toDateTime(time)}
            </div>
            <div className={commonStyle.searchResultFooter}>
                {testId ?
                    <>
                        <div className={commonStyle.searchResultButton} onClick={() => showModal()}>
                            {testType === 'covidTest' ? t('APP_SET_TEST_RESULT') : t('APP_SET_IMMUNITY')}
                        </div>
                        <Modal
                            title={testType === 'covidTest' ? t('APP_SET_TEST_RESULT') : t('APP_SET_IMMUNITY')}
                            visible={isModalVisible}
                            onOk={handleOkModal}
                            onCancel={handleCancelModal}
                            confirmLoading={modalConfirmLoading}
                            getContainer={false}
                            okText="Confirm"
                        >
                            {testType === 'covidTest'
                                ? <Radio.Group onChange={onChange} value={positive}>
                                    <Radio value={true}>Positive</Radio>
                                    <Radio value={false}>Negative</Radio>
                                </Radio.Group>
                                : null}
                        </Modal>
                    </> :
                    <>
                        <Popconfirm
                            title="Do you want to send a message to this user?"
                            onConfirm={handleOkPop}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ loading: popConfirmLoading }}
                        >
                            <div className={commonStyle.searchResultButton}>
                                <FontAwesomeIcon icon={faEnvelope} /> {t('APP_MESSAGE')}
                            </div>
                        </Popconfirm>
                    </>}
            </div>
        </div >
    );
});

export default SearchResult;
