import React, { useState } from 'react';
import style from './Admin.module.css';
import { useTranslation } from 'react-i18next';
import MoaiPin from '../../assets/moai-pin.png';
import { Card, Table, Tag, Button, Modal, Input } from 'antd';

const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
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
        render: (text, record) => (
            <>
                <Button type="dashed" disabled={record.status !== 'member' ? true : false} style={{ marginRight: '1rem' }}>Grant Admin</Button>
                <Button type="dashed" danger disabled={record.status !== 'admin' ? true : false} style={{ marginRight: '1rem' }}>Revoke Admin</Button>
            </>
        )
    }
];

const data = [
    {
        key: '1',
        username: 'John Brown',
        status: 'admin'
    },
    {
        key: '2',
        username: 'Jim Green',
        status: 'member'
    },
    {
        key: '3',
        username: 'Joe Black',
        status: 'invited'
    }
];

const Admin: React.FC = () => {

    const { t } = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPopVisible, setIsPopVisible] = useState(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
    const [popConfirmLoading, setPopConfirmLoading] = useState(false);

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
                <h1>Admin Dashboard</h1>
            </div>
            <Card
                title={'My Teams'}
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
                <Button type="primary" onClick={showModal}>Add a new tracer</Button>
                <br />
                <br />
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                />
                <Modal
                    title="Add a new tracer"
                    visible={isModalVisible}
                    onOk={handleOk}
                    okText={'Send Invite'}
                    onCancel={handleCancel}
                    getContainer={false}
                >
                    Please input the email address of the tracer you would like to add to your group:
                    <br />
                    <br />
                    <Input placeholder="Email address" />
                </Modal>
            </Card>
        </div>
    );
};

export default Admin;