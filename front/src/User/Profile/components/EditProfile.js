import React, {Component} from 'react'
import {Layout, Col, Row, Form, Icon, Button, Input, message, Select, Upload, Avatar} from 'antd'
import axios from 'axios'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

import UploadAvatar from "./UploadAvatar";

const {Option} = Select;

const profession = ['高新科技', '互联网', '电子商务', '    电子游戏', '    计算机软件', '    计算机硬件', '信息传媒',
    '    出版业', '    电影录音', '    广播电视', '    通信', '金融', '    银行', '    资本投资', '    证券投资',
    '    保险', '    信贷', '    财务', '    审计', '服务业', '    法律', '    餐饮', '    酒店', '    旅游',
    '    广告', '    公关', '    景观', '    咨询分析', '    市场推广', '    人力资源', '    社工服务',
    '    养老服务', '教育', '    高等教育', '    基础教育', '    职业教育', '    幼儿教育', '    特殊教育',
    '    培训', '医疗服务', '    临床医疗', '    制药', '    保健', '    美容', '    医疗器材',
    '    生物工程', '    疗养服务', '    护理服务', '艺术娱乐', '    创意艺术', '    体育健身',
    '    娱乐休闲', '    图书馆', '    博物馆', '    策展', '    博彩', '制造加工', '    食品饮料业',
    '    纺织皮革业', '    服装业', '    烟草业', '    造纸业', '    印刷业', '    化工业', '    汽车',
    '    家具', '    电子电器', '    机械设备', '    塑料工业', '    金属加工', '    军火', '地产建筑',
    '    房地产', '    装饰装潢', '    物业服务', '    特殊建造', '    建筑设备', '贸易零售', '    零售',
    '    大宗交易', '    进出口贸易', '公共服务', '    政府', '    国防军事', '    航天', '    科研',
    '    给排水', '    水利能源', '    电力电网', '    公共管理', '    环境保护', '    非营利组织',
    '开采冶金', '    煤炭工业', '    石油工业', '    黑色金属', '    有色金属', '    土砂石开采', '    地热开采',
    '交通仓储', '    邮政', '    物流递送', '    地面运输', '    铁路运输', '    管线运输', '    航运业',
    '    民用航空业', '农林牧渔', '    种植业', '    畜牧养殖业', '    林业', '    渔业'];

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('File size must smaller than 2MB!')
    }
    return isLt2M
}


class SettingProfile extends Component {
    componentDidMount() {
        this.getProfileData();
    }

    state = {
        data: [],
        collapsed: false,
        bio: '',
        username: '',
        email: '',
        uploading: false,
        profession: '',
        urlAvatar: '',
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed})
    };

    getProfileData = async (v) => {
        try {
            let config = {
                headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
            };
            const response = await axios.get(
                'http://127.0.0.1:8000/rest-auth/user/',
                config
            );
            this.data = response.data.results;
            this.setState(function (state) {
                return {
                    id: response.data.id,
                    urlAvatar: response.data.profile.avatar,
                    bio: response.data.profile.bio,
                    username: response.data.username,
                    email: response.data.email,
                    profession: response.data.profile.profession
                }
            })
        } catch (error) {
            console.log(error)
        }
    };

    normFile = e => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    customRequest = async (info) => {
        try {
            let formData = new window.FormData();
            formData.append('image', info.file);
            const response = await axios.post(
                info.action,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Client-ID d0b3bf7724440e7',
                    }
                }
            );
            info.onSuccess(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (error, values) => {
            // console.log(values.avatar[0].response.data.link);
            let avatar_data;
            if (values.avatar) {
                avatar_data = values.avatar[0].response.data.link
            } else {
                avatar_data = this.state.urlAvatar
            }
            if (!error) {
                this.setState({
                    uploading: true
                });
                const submitData = {
                    username: values.username,
                    bio: values.bio,
                    email: values.email,
                    profession: values.profession,
                    avatar: avatar_data,
                };
                try {
                    let config = {
                        headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
                    };
                    const response = await axios.patch(
                        'http://127.0.0.1:8000/rest-auth/user/',
                        {
                            username: submitData.username,
                            profile: {
                                bio: submitData.bio,
                                profession: submitData.profession,
                                avatar: submitData.avatar,
                            },
                            email: submitData.email
                        },
                        config
                    );
                    this.setState({
                        uploading: false
                    });
                    if (response.status === 200) {
                        message.success('Update successfully');
                        this.props.history.replace('/profile')
                    }
                } catch (error) {
                    message.error('Update unsuccessfully');
                    console.log(error.response.data);
                    this.setState({
                        uploading: false
                    })
                }
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Layout style={{minHeight: '100vh', backgroundColor: '#fff'}}>
                <div style={{flex: '1 0'}}>
                    <Row style={{flex: '1 0', paddingTop: '20px'}}>
                        <Col xxl={{span: 3, offset: 5}} xl={{span: 4, offset: 2}} md={{span: 5, offset: 1}}
                             xs={{span: 22, offset: 1}} style={{marginBottom: '20px'}}>
                            <nav style={{border: '1px solid #d1d5da', borderRadius: '3px'}}>
                                <div style={{
                                    backgroundColor: '#f3f5f8',
                                    color: '#586069',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    borderBottom: '1px solid #e1e4e8',
                                    fontWeight: '800'
                                }}>
                                    Setting
                                </div>
                                <Link to='/settings/profile'>
                                    <div style={{
                                        padding: '8px 10px',
                                        display: 'block',
                                        borderBottom: '1px solid #e1e4e8',
                                        color: '#24292e',
                                        fontWeight: '600',
                                        cursor: 'default',
                                        borderLeft: '3px solid #e36209'
                                    }}>
                                        <Icon type='user' style={{paddingRight: '6px'}}/>个人信息
                                    </div>
                                </Link>
                                <Link to='/settings/account'>
                                    <div style={{padding: '8px 10px', display: 'block', color: '#0366d6'}}>
                                        <Icon type='user' style={{paddingRight: '6px'}}/>账号设置
                                    </div>
                                </Link>
                            </nav>
                        </Col>
                        <Col xxl={{span: 11, offset: 0}} xl={{span: 16, offset: 0}} md={{span: 16, offset: 0}}
                             xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                            <div style={{padding: '0 10px '}}>
                                <Row>
                                    <Col xl={{span: 24, offset: 0}} xs={{span: 22, offset: 1}}>
                                        <div style={{
                                            fontSize: '20px',
                                            borderBottom: '1px solid #e1e4e8',
                                            paddingBottom: '8px',
                                            fontWeight: '600',
                                            color: '#24292e'
                                        }}>
                                            Personal Info
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <Col xl={{span: 16, offset: 0}} xs={{span: 22, offset: 1}}
                                         style={{paddingBottom: '20px'}}>
                                        <Form onSubmit={this.handleSubmit}>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                lineHeight: '21px',
                                                marginBottom: '3px',
                                                color: '#24292e'
                                            }}>Username
                                            </div>
                                            <Form.Item>
                                                {getFieldDecorator('username', {
                                                    initialValue: this.state.username,
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please input username.'
                                                    }]
                                                })(
                                                    <Input size='default'/>
                                                )}
                                            </Form.Item>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                lineHeight: '21px',
                                                marginBottom: '3px',
                                                color: '#24292e'
                                            }}>Introduction
                                            </div>
                                            <Form.Item>
                                                {getFieldDecorator('bio', {
                                                    initialValue: this.state.bio,
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please input bio.'
                                                    }]
                                                })(
                                                    <Input size='default'/>
                                                )}
                                            </Form.Item>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                lineHeight: '21px',
                                                marginBottom: '3px',
                                                color: '#24292e'
                                            }}>Email
                                            </div>
                                            <Form.Item>
                                                {getFieldDecorator('email', {
                                                    initialValue: this.state.email,
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please input email.'
                                                    }]
                                                })(
                                                    <Input size='default'/>
                                                )}
                                            </Form.Item>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                lineHeight: '21px',
                                                marginBottom: '3px',
                                                color: '#24292e'
                                            }}>Industry
                                            </div>
                                            <Form.Item hasFeedback>
                                                {getFieldDecorator('profession', {
                                                    initialValue: this.state.profession,
                                                    rules: [{required: true, message: 'Please select your peofession!'}]
                                                })(
                                                    <Select placeholder='Please select a profession'>
                                                        {profession.map(item => (
                                                            <Option key={'options'} value={item}>{item}</Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                            <Form.Item label="Upload Avatar">
                                                {getFieldDecorator('avatar', {
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload name="avatar"
                                                            action="https://api.imgur.com/3/image"
                                                            listType="picture" customRequest={this.customRequest}
                                                            beforeUpload={beforeUpload}>
                                                        <Button>
                                                            <Icon type="upload"/> Click to upload
                                                        </Button>
                                                    </Upload>,
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button loading={this.state.uploading} type='primary' htmlType='submit'
                                                        style={{
                                                            backgroundColor: '#2fcb53',
                                                            color: 'white',
                                                            borderColor: '#2fcb53',
                                                            fontWeight: '400'
                                                        }}>
                                                    Update
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col xl={{span: 6, offset: 2}} xs={{span: 22, offset: 1}}>
                                        <Avatar size={180} shape='square' src={this.state.urlAvatar} icon='user'
                                                style={{color: '#ffffff', backgroundColor: '#f6f6f6'}}/>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}

const EditProfile = withRouter(Form.create()(SettingProfile));
export default EditProfile
