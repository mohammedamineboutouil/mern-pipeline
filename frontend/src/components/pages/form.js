import React, {useContext, useState} from 'react';
import {Button, Col, DatePicker, Form, Input, Radio, Row, Spin, Switch, Typography} from 'antd';
import {useHistory} from 'react-router';
import {AppContext} from "../../contexts/main";
import {errorResponseHandler, openNotification} from "../../utils";

const {Title} = Typography;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const FormApp = () => {
    const history = useHistory();
    const {addNewUser} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        if (values) {
            await addNewUser(values)
                .then(() => {
                    setLoading(false);
                    openNotification({type: 'success', message: 'User added with success'});
                    history.push('/users');
                }).catch(res => {
                    setLoading(false);
                    openNotification({type: 'error', message: errorResponseHandler(res)});
                });
        }
    }

    return (
        <>
            <Row gutter={[40, 0]}>
                <Col span={23}>
                    <Title style={{textAlign: 'center'}} level={2}>
                        Please Fill the User Form
                    </Title>
                </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Spin spinning={loading} size={"large"}>
                        <Form {...layout} onFinish={handleSubmit}>
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
                                <Button type="primary" htmlType="button" onClick={() => history.push('/users')}>
                                    Back
                                </Button>
                            </div>
                        </Form>
                    </Spin>
                </Col>
            </Row>
        </>
    );
}

export default FormApp;
