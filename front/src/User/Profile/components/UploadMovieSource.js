import React, {Component} from 'react'
import {
    Layout,
    Row,
    Col,
    Typography,
    Form,
    Button,
    Icon,
    Input,
    Upload,
    message,
    InputNumber,
    notification,
    Tooltip,
    Divider, BackTop
} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';

const {Title} = Typography;
const openNotificationWithIconS = (type) => {
    notification[type]({
        message: 'Successful',
        description: 'Upload Successfully',
        duration: 2
    })
};
const openNotificationWithIconE = (type) => {
    notification[type]({
        message: 'Error',
        description: "You don't have permission",
        duration: 2
    })
}
const {TextArea} = Input;

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('File size must smaller than 2MB!')
    }
    return isLt2M
}

class MovieEditor extends Component {
    state = {
        imageUrl: '',
        loading: false
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    loading: true
                });
                const submitData = {
                    name: values.name,
                    region: values.region,
                    number: values.number,
                    length: values.length,
                    poster: values.poster ? values.poster[0].response.data.link : '',
                    overview: values.overview,
                    description: values.description,
                    actors: values.actors,
                    director: values.director,
                    scriptwriter: values.scriptwriter,
                };
                try {
                    let config = {
                        headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
                    };
                    const response = await axios.post(
                        'http://127.0.0.1:8000/api/movie/movies/',
                        {
                            name: submitData.name,
                            region: submitData.region,
                            number: submitData.number,
                            length: submitData.length,
                            cover: submitData.cover,
                            description: submitData.description,
                            actors: submitData.actors,
                            director: submitData.director,
                            scriptwriter: submitData.scriptwriter,
                            poster: submitData.poster
                        },
                        config
                    );
                    this.setState({
                        loading: false
                    });
                    if (response.status === 201) {
                        openNotificationWithIconS('success');
                        this.props.history.replace('/movie')
                    }
                } catch (error) {
                    if (error.response.status === 403) {
                        openNotificationWithIconE('error');
                        this.setState({
                            loading: false
                        })
                    }
                }
            }
        })
    };

    normFile = e => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    };

    customRequest = async (info) => {
        try {
            let formData = new window.FormData();
            formData.append('smfile', info.file);
            const response = await axios.post(
                info.action,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            );
            info.onSuccess(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Layout style={{minHeight: '100vh', backgroundColor: '#f7f7f7'}}>
                <BackTop/>
                <div>
                    <Row style={{paddingTop: '30px', paddingBottom: '30px'}} type={"flex"} justify={"center"}>
                        <Col xxl={{span: 10}} xl={{span: 13}} md={{span: 15}} xs={{span: 24}} style={{
                            marginBottom: '20px',
                            backgroundColor: '#fff',
                            padding: '30px 30px',
                            boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                            borderRadius: '2px'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                                <Title level={3}>欢迎你，可爱的编辑</Title>
                                <Divider type='vertical'/>
                                <Link to='/editor_guidance'>编辑须知</Link>
                            </div>
                            <Form onSubmit={this.handleSubmit} className='book-editor-form'>
                                <Form.Item
                                    label='Movie name'>
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the name of movie!'
                                            }
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Region'>
                                    {getFieldDecorator('region', {
                                        rules: [
                                            {}
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Director'>
                                    {getFieldDecorator('director', {
                                        rules: [
                                            {}
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Actor'>
                                    {getFieldDecorator('actors', {
                                        rules: [
                                            {}
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Scriptwriter'>
                                    {getFieldDecorator('scriptwriter', {
                                        rules: [
                                            {}
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label={(
                                    <span>
                                        集数&nbsp;
                                        <Tooltip title='电影就是默认一集'>
                                            <Icon type='question-circle-o'/>
                                        </Tooltip>
                                    </span>
                                )}>
                                    {getFieldDecorator('number', {
                                        initialValue: 1,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the numbers of movie!'
                                            }
                                        ]
                                    })(<InputNumber min={0} max={100000000000}/>)}
                                    <span className='ant-form-text'>集</span>
                                </Form.Item>
                                <Form.Item label={(
                                    <span>
                                        Run Time&nbsp;
                                        <Tooltip title='length'>
                                            <Icon type='question-circle-o'/>
                                        </Tooltip>
                                            </span>
                                )}>
                                    {getFieldDecorator('length', {
                                        initialValue: 0,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the run time of movie!'
                                            }
                                        ]
                                    })(<InputNumber min={0} max={100000000000}/>)}
                                    <span className='ant-form-text'>minutes</span>
                                </Form.Item>
                                <Form.Item label='Description'>
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {}
                                        ]
                                    })(<TextArea
                                        placeholder='简要说说这部片吧'
                                        autosize={{minRows: 2, maxRows: 20}}
                                    />)}
                                </Form.Item>
                                <Form.Item label='封面'>
                                    {getFieldDecorator('cover', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile
                                    })(
                                        <Upload name='cover'
                                                action='https://sm.ms/api/upload'
                                                listType='picture'
                                                customRequest={this.customRequest}
                                                beforeUpload={beforeUpload}>
                                            <Button>
                                                <Icon type='upload'/> 点击上传
                                            </Button>
                                        </Upload>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit' loading={this.state.loading}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}

const MovieSourceEditor = connect()(Form.create()(MovieEditor));

export default MovieSourceEditor
