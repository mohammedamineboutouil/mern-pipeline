import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Col, Input, Row, Spin, Table, Tooltip, Typography} from 'antd';
import {useHistory} from 'react-router';
import {AppContext} from "../../contexts/main";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {errorResponseHandler, openNotification} from "../../utils";
import UserModal from "./UserModal";
import UserInfoModal from "./UserInfoModal";
import {isEmpty} from "../../utils/validator";

const {Title, Text} = Typography;
const {Search} = Input;

const Users = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [userInfoModal, setInfoUserModal] = useState(false);

    const {
        users,
        allUsers,
        filtered,
        setCurrent,
        initialData,
        clearFilter,
        filterUsers,
        clearCurrent,
        deleteUserById,
    } = useContext(AppContext);

    useEffect(() => {
        allUsers();
    }, [filtered]);

    const handleDelete = async id => {
        await deleteUserById(id)
            .then(() => {
                openNotification({type: 'success', message: 'User deleted with success'});
            }).catch(res => {
                openNotification({type: 'error', message: errorResponseHandler(res)});
            });
    }

    const getUserDetail = record => {
        setCurrent(record)
        setInfoUserModal(true);
    }

    const setCurrentUser = record => {
        setCurrent(record)
        setUserModal(true);
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Gender',
            dataIndex: 'gender'
        },
        {
            title: 'Birth Date',
            dataIndex: 'dob'
        },
        {
            title: 'Profile Photo',
            dataIndex: 'photo',
            render: (text, record) =>
                <Avatar shape="square" size={64} src={record.photo}/>
        },
        {
            title: 'News',
            dataIndex: 'news'
        }, {
            title: 'Action',
            dataIndex: '',
            key: 'y',
            render: (text, record) =>
                <>
                    <Tooltip title="edit">
                        <Button style={{margin: 10}} type="primary" onClick={() => setCurrentUser(record)}>
                            <EditOutlined/>
                        </Button>
                    </Tooltip>
                    <Tooltip title="delete">
                        <Button style={{margin: 10}} type="danger" onClick={() => handleDelete(record._id)}>
                            <DeleteOutlined/>
                        </Button>
                    </Tooltip>
                    <Tooltip title="detail">
                        <Button style={{margin: 10}} type="default" onClick={() => getUserDetail(record)}>
                            <InfoCircleOutlined/>
                        </Button>
                    </Tooltip>
                </>
        }
    ];

    const handleMockClick = async () => {
        setLoading(true);
        await initialData()
            .then(async () => {
                await allUsers();
                openNotification({type: 'success', message: 'Data initializer successfully'});
                setLoading(false);
            }).catch(res => {
                openNotification({type: 'error', message: errorResponseHandler(res)});
            });
    }

    const handleClick = () => {
        history.push('/form')
    }

    const closeUserModal = () => {
        setUserModal(false);
        clearCurrent();
    }

    const closeInfoUserModal = () => {
        setInfoUserModal(false);
        clearCurrent();
    }

    const handleSearch = async e => {
        if (!isEmpty(e.target.value)) {
            await filterUsers(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <div>
            {userModal &&
            <UserModal show={userModal} handleClose={closeUserModal}/>
            }
            {userInfoModal &&
            <UserInfoModal show={userInfoModal} handleClose={closeInfoUserModal}/>
            }
            <Row gutter={[40, 0]}>
                <Col span={6}>
                    <Title style={{fontSize: 20}}>
                        User List
                    </Title>
                </Col>
                <Col span={6}>
                    <Text mark strong={true} style={{fontSize: 20}} block={true}>Users count: {users.length}</Text>
                </Col>
                <Col span={6}>
                    <Button onClick={handleMockClick} block={true}>Initial Data (MOCK)</Button>
                </Col>
                <Col span={6}>
                    <Button onClick={handleClick} block={true}>Add User</Button>
                </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Search
                        placeholder="Search for users from here"
                        enterButton="Search"
                        size="large"
                        onChange={handleSearch}
                        style={{paddingBottom:20,paddingTop:20}}
                    />
                    <Spin spinning={loading} size={"large"}>
                        <Table columns={columns} dataSource={filtered.length > 0 ? filtered : users} rowKey={'_id'}/>
                    </Spin>
                </Col>
            </Row>
        </div>
    );
}

export default Users;