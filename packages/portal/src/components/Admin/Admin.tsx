import React, { useState, useEffect } from 'react';
import commonStyle from '../../Common.module.css';
import { useTranslation } from 'react-i18next';
import MoaiPin from '../../assets/moai-pin.png';
import { Card, Table, Tag, Button, Modal, Input, Popconfirm } from 'antd';
import { withState } from '../../store';
import { toDateTime } from '../../utils/timeHandler';
import { inviteTracer, revokeAdmin, grantAdmin } from '../../actions';


const Admin = withState()((s) => ({
    groupMembers: s.principal.groupMembers,
    group: s.principal.group
}), ({ groupMembers, group, dispatch }) => {

    const { t } = useTranslation();
    const [inviteEmail, setInviteEmail] = useState<string>();
    const [groupInfo, setGroupInfo] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
    const [grantingAdmin, setGrantingAdmin] = useState(false);
    const [revokingAdmin, setRevokingAdmin] = useState(false);

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
                    <Popconfirm
                        title="Do you want to grant this tracer admin rights?"
                        onConfirm={() => onGrantAdmin(record.userId)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ loading: grantingAdmin }}
                    >
                        <Button
                            type="dashed"
                            disabled={record.status !== 'Member' ? true : false}
                            style={{ marginRight: '1rem' }}>
                            {t('APP_ADMIN_GRANT_ADMIN')}
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Do you want to revoke this tracer's admin rights?"
                        onConfirm={() => onRevokeAdmin(record.userId)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ loading: revokingAdmin }}
                    >
                        <Button
                            type="dashed"
                            danger
                            disabled={record.status !== 'Admin' ? true : false}
                            style={{ marginRight: '1rem' }}>
                            {t('APP_ADMIN_REVOKE_ADMIN')}
                        </Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    useEffect(() => {
        setGroupInfo([]);
        groupMembers.forEach((member) => {
            setGroupInfo(groupInfo => [
                ...groupInfo,
                {
                    key: member.userId,
                    username: member.tracer.username,
                    userId: String(member.userId).slice(0, 8),
                    status: member.status === 1 ? 'Member' : 'Admin',
                    date: toDateTime(member.date)
                }
            ]);
        });
    }, [dispatch, groupMembers]);

    const showModal = (): void => {
        setIsModalVisible(true);
    };

    const handleOkModal = (): void => {
        setModalConfirmLoading(true);
        dispatch(inviteTracer(group, (Date.now() + 24 * 60 * 60 * 1000) * 1000000, inviteEmail, false))
            .then(() => {
                setIsModalVisible(false);
                setModalConfirmLoading(false);
            });
    };

    const handleCancel = (): void => {
        setIsModalVisible(false);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInviteEmail(e.target.value);
    };

    /**
     * Function to grant a user admin rights on Moai Portal
     * @param userId - ID of the user
     */
    const onGrantAdmin = (userId: string) => {
        setGrantingAdmin(true);
        dispatch(grantAdmin(group, userId))
            .then(() => {
                setGrantingAdmin(false);
            });
    };

    /**
     * Function to revoke user's admin rights on Moai Portal
     * @param userId - ID of the user
     */
    const onRevokeAdmin = (userId: string) => {
        setRevokingAdmin(true);
        dispatch(revokeAdmin(group, userId))
            .then(() => {
                setRevokingAdmin(false);
            });
    };

    return (
        <div className={commonStyle.container}>
            <div className={commonStyle.header}>
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
                    onOk={handleOkModal}
                    okText={t('APP_ADMIN_SEND_INVITE')}
                    onCancel={handleCancel}
                    confirmLoading={modalConfirmLoading}
                    getContainer={false}
                >
                    {t('APP_ADMIN_INPUT_EMAIL')}:
                    <br />
                    <br />
                    <Input placeholder={t('APP_EMAIL')} onChange={onChange} />
                </Modal>
            </Card>
        </div>
    );
});

export default Admin;