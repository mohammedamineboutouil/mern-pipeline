import React, {useContext} from 'react';
import {Avatar, Descriptions, Modal} from 'antd';
import {AppContext} from "../../contexts/main";

const UserInfoModal = ({handleClose, show}) => {
    const {
        current
    } = useContext(AppContext);
    React.useLayoutEffect(() => {
    }, [show]);
    return (
        <Modal
            visible={show}
            onCancel={handleClose}
            footer={null}
        >
            <Descriptions title="User Info" layout="horizontal">
                <Descriptions.Item label="UserName" span={10}>{current && current.username}</Descriptions.Item>
                <Descriptions.Item label="Email" span={10}>{current && current.email}</Descriptions.Item>
                <Descriptions.Item label="Gender" span={10}>{current && current.gender}</Descriptions.Item>
                <Descriptions.Item label="News" span={10}>{current && current.news}</Descriptions.Item>
                <Descriptions.Item label="Photo" span={10}>
                    <Avatar shape="square" size={64} src={current && current.photo}/>
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};
export default UserInfoModal;