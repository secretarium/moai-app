import React, { useState, useEffect } from 'react';
import style from './Admin.module.css';
import { useTranslation } from 'react-i18next';
import MoaiPin from '../../assets/moai-pin.png';
import { Card, Table, Tag, Button, Modal, Input } from 'antd';
import { withState } from '../../store';
import { toDateTime } from '../../utils/timeHandler';


const Admin = withState()((s) => ({
    groupMembers: s.principal.groupMembers
}), ({ groupMembers, dispatch }) => {

    const { t } = useTranslation();
    const [groupInfo, setGroupInfo] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: 'Date Joined',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <Tag color={'geekblue'} key={status}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <>
                    <Button type="dashed" disabled={record.status !== 1 ? true : false} style={{ marginRight: '1rem' }}>{t('APP_ADMIN_GRANT_ADMIN')}</Button>
                    <Button type="dashed" danger disabled={record.status !== 2 ? true : false} style={{ marginRight: '1rem' }}>{t('APP_ADMIN_REVOKE_ADMIN')}</Button>
                </>
            )
        }
    ];

    useEffect(() => {
        groupMembers.forEach((member, index) => {
            setGroupInfo(groupInfo => [
                ...groupInfo,
                {
                    key: index,
                    username: member.tracer.username,
                    userId: String(member.userId).slice(0, 8),
                    status: member.status,
                    date: toDateTime(member.date)
                }
            ]);
        });
    }, [dispatch, groupMembers]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={style.containerAdmin}>
            <div className={style.adminHeader}>
                <img src={MoaiPin} alt="Moai pin" style={{ paddingRight: '10px' }} />
                <h1>{t('APP_ADMIN_DASHBOARD')}</h1>
            </div>
            <Card
                title={t('APP_ADMIN_MY_TEAM')}
                headStyle={{
                    backgroundColor: '#f4f7f9',
                    borderBottomColor: '#dee8ee',
                    fontWeight: 'bold',
                    height: '3rem',
                    lineHeight: '1.8rem'
                }}
                bodyStyle={{
                    border: 'none',
                    height: 'calc(100% - 5rem)',
                    boxSizing: 'border-box',
                    position: 'relative',
                    backgroundColor: '#fff'
                }}
                style={{
                    marginTop: '2rem',
                    border: 'none',
                    width: '90%',
                    boxShadow: '0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1)'
                }}
            >
                <Button type="primary" onClick={showModal}>{t('APP_ADMIN_ADD_TRACER')}</Button>
                <br />
                <br />
                <Table
                    columns={columns}
                    dataSource={groupInfo}
                    pagination={false}
                    bordered
                    loading={!groupInfo}
                />
                <Modal
                    title={t('APP_ADMIN_ADD_TRACER')}
                    visible={isModalVisible}
                    onOk={handleOk}
                    okText={t('APP_ADMIN_SEND_INVITE')}
                    onCancel={handleCancel}
                    getContainer={false}
                >
                    {t('APP_ADMIN_INPUT_EMAIL')}:
                    <br />
                    <br />
                    <Input placeholder={t('APP_EMAIL')} />
                </Modal>
            </Card>
        </div>
    );
});

export default Admin;