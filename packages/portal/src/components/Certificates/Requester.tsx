import React, { useEffect, useState } from 'react';
import MoaiPin from '../../assets/moai-pin.png';
import { toTimestamp } from '../../utils/timeHandler';
import { getImmunityCertificateRequestRecords, manageImmunityCertificateRequest } from '../../actions';
import { withState } from '../../store';
import commonStyle from '../../Common.module.css';
import { Modal, Radio, DatePicker, TimePicker } from 'antd';
import { useTranslation } from 'react-i18next';


type RequesterProps = {
    /**
     * ID of the user requesting an immunity certificate
     */
    requesterId: string;
};

const Requester = withState<RequesterProps>()((s) => ({
    requestRecords: s.certificates.requestRecords
}), ({ requesterId, dispatch }) => {

    const { t } = useTranslation();
    const [approved, setApproved] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
    const [date, setDate] = useState<string | undefined>(undefined);
    const [time, setTime] = useState<string | undefined>(undefined);

    useEffect(() => {
        dispatch(getImmunityCertificateRequestRecords(requesterId));
    }, []);

    const onChange = (e): void => {
        setApproved(e.target.value);
    };

    const showModal = (): void => {
        setIsModalVisible(true);
    };

    const handleCancelModal = (): void => {
        setIsModalVisible(false);
    };

    const handleOkModal = (): void => {
        setModalConfirmLoading(true);
        dispatch(manageImmunityCertificateRequest(requesterId, approved, (approved ? toTimestamp(date, time) : null)))
            .then(() => {
                setIsModalVisible(false);
                setModalConfirmLoading(false);
            });
    };

    return (
        <div className={commonStyle.searchResultContainer}>
            <div className={commonStyle.searchResultHeader}>
                <img src={MoaiPin} alt="Moai pin" style={{ width: '64px', height: 'auto', marginRight: '10px' }} />
            </div>
            <div className={commonStyle.searchResultBody}>
                {`${t('APP_USER_ID')}: ${requesterId}`}
            </div>
            <div className={commonStyle.searchResultFooter}>
                <div className={commonStyle.searchResultButton} onClick={() => showModal()}>
                    Manage
                </div>
                <Modal
                    title="Manage Immunity Certificate Request"
                    visible={isModalVisible}
                    onOk={handleOkModal}
                    onCancel={handleCancelModal}
                    confirmLoading={modalConfirmLoading}
                    getContainer={false}
                    okText="Confirm"
                >
                    {approved
                        ? <>
                            <DatePicker
                                style={{ width: '50%' }}
                                placeholder={t('APP_SEARCH_DATE')}
                                onChange={(value, dateString) => setDate(dateString)} />
                            <br></br>
                            <br></br>
                            <TimePicker
                                style={{ width: '50%' }}
                                placeholder={t('APP_SEARCH_TIME')}
                                onChange={(value, dateString) => setTime(dateString)} />
                            <br></br>
                            <br></br>
                        </>
                        : null}
                    <Radio.Group onChange={onChange} value={approved}>
                        <Radio value={true}>Approve</Radio>
                        <Radio value={false}>Reject</Radio>
                    </Radio.Group>
                </Modal>
            </div>
        </div >
    );
});

export default Requester;