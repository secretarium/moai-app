import React, { useEffect, useState } from 'react';
import MoaiPin from '../../assets/moai-pin.png';
import { toDateTime } from '../../utils/timeHandler';
import { useHistory } from 'react-router-dom';
import { createConversation, setTestResult } from '../../actions';
import { withState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import style from './SearchResult.module.css';
import { Modal, Radio, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';


type SearchResultProps = {
    testId?: string;
    userId: string;
    time: number;
};

const SearchResult = withState<SearchResultProps>()((s) => ({
    newConversation: s.conversations.newConversation
}), ({ testId, userId, time, newConversation, dispatch }) => {

    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [positive, setPositive] = useState(null);
    const [isPopVisible, setIsPopVisible] = useState(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
    const [popConfirmLoading, setPopConfirmLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (newConversation) {
            history.push(`/chat/${newConversation.address}`);
        }
    }, [newConversation, history]);

    const onClick = (): void => {
        dispatch(createConversation('title', 'name', userId));
    };

    const onChange = (e): void => {
        console.log('radio checked', e.target.value);
        setPositive(e.target.value);
    };

    const showModal = (): void => {
        setIsModalVisible(true);
    };

    const handleOkModal = (): void => {
        setModalConfirmLoading(true);
        dispatch(setTestResult(testId, positive, userId))
            .then(() => {
                setIsModalVisible(false);
                setModalConfirmLoading(false);
            });
    };

    const handleCancelModal = (): void => {
        setIsModalVisible(false);
    };

    const handleOkPop = (e): void => {
        setPopConfirmLoading(true);
        dispatch(createConversation('title', 'name', userId))
            .then(() => {
                setIsPopVisible(false);
                setPopConfirmLoading(false);
            });
    };

    const handleCancelPop = (e): void => {
        setIsPopVisible(false);
    };

    return (
        <div className={style.searchResultContainer}>
            <div className={style.searchResultHeader}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
            </div>
            <div className={style.searchResultBody}>
                {`${t('APP_USER_ID')}: ${userId}`}
                <br></br>{t('APP_TIME')}: {toDateTime(time)}
            </div>
            <div className={style.searchResultFooter}>
                {testId ?
                    <>
                        <div className={style.searchResultButton} onClick={() => showModal()}>
                            Set test result
                        </div>
                        <Modal
                            title="Set test result"
                            visible={isModalVisible}
                            onOk={handleOkModal}
                            onCancel={handleCancelModal}
                            confirmLoading={modalConfirmLoading}
                            getContainer={false}
                        >
                            <Radio.Group onChange={onChange} value={positive}>
                                <Radio value={true}>Positive</Radio>
                                <Radio value={false}>Negative</Radio>
                            </Radio.Group>
                        </Modal>
                    </> :
                    <>
                        <Popconfirm
                            title="Do you want to send a message to this user?"
                            visible={isPopVisible}
                            onConfirm={handleOkPop}
                            onCancel={handleCancelPop}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ loading: popConfirmLoading }}
                        >
                            <div className={style.searchResultButton} onClick={() => onClick()}>
                                <FontAwesomeIcon icon={faEnvelope} /> {t('APP_MESSAGE')}
                            </div>
                        </Popconfirm>
                    </>}
            </div>
        </div >
    );
});

export default SearchResult;
