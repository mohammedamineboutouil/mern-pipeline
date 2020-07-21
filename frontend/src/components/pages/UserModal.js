import React, {useContext, useState} from 'react';
import {Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Spin, Switch} from 'antd';
import {AppContext} from "../../contexts/main";
import moment from "moment";
import {errorResponseHandler, openNotification} from "../../utils";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const UserModal = ({handleClose, show}) => {
    const [loading, setLoading] = useState(false);

    const {
        editUser,
        current
    } = useContext(AppContext);

    const [form] = Form.useForm();

    React.useLayoutEffect(() => {
        if (current) {
            form.setFieldsValue({
                ...current,
                dob: moment(current.dob)
            });
        }
    }, [current, show]);

    const handleSubmit = async (values) => {
        setLoading(true);
        if (values) {
            values._id = current._id;
            await editUser(values)
                .then(() => {
                    setLoading(false);
                    openNotification({type: 'success', message: 'User added with success'});
                    handleClose();
                }).catch(res => {
                    setLoading(false);
                    openNotification({type: 'error', message: errorResponseHandler(res)});
                });
        }
    }

    return (
        <Modal
            title={'Edit User Form'}
            visible={show}
            onCancel={handleClose}
            footer={null}
        >
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Spin spinning={loading} size={"large"}>
                        <Form {...layout} form={form} onFinish={handleSubmit}>
                            <Form.Item name="username" label="UserName"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Please input your name',
                                           }
                                       ]}
                            >
                                <Input placeholder="Please Enter your username"/>
                            </Form.Item>
                            <Form.Item name="email" label="Email"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Please input your correct email',
                                               type: 'email'
                                           }
                                       ]}
                            >
                                <Input placeholder="Please Enter your email"/>
                            </Form.Item>
                            <Form.Item name="photo" label="Photo"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Please input your photo Url',
                                           }
                                       ]}
                            >
                                <Input placeholder="Please Enter your photo Url"/>
                            </Form.Item>
                            <Form.Item name="dob" label="Birth date"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Please select your birth date',
                                           }
                                       ]}
                            >
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item name="gender" label="Gender"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Please select your gender',
                                           }
                                       ]}
                            >
                                <Radio.Group>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="news" label="News" valuePropName="checked"
                            >
                                <Switch/>
                            </Form.Item>
                            <div style={{textAlign: "right"}}>
                                <Button type="primary" loading={loading} htmlType="submit">
                                    Save
                                </Button>{' '}
                                <Button type="primary" htmlType="button" onClick={handleClose}>
                                    Back
                                </Button>
                            </div>
                        </Form>
                    </Spin>
                </Col>
            </Row>
        </Modal>
    );
};

export default UserModal;