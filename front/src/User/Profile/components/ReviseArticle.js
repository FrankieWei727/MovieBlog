import React, {Component} from 'react'
import {Layout, notification, Form, Input, Button, Row, Col, Switch} from 'antd'
import axios from 'axios'
import {withRouter} from 'react-router'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const openNotificationWithIconS = (type) => {
    notification[type]({
        message: 'Succeed',
        description: 'Save successfully!',
        duration: 2
    })
};
const openNotificationWithIconE = (type) => {
    notification[type]({
        message: 'Error',
        description: 'Save unsuccessfully!',
        duration: 2
    })
};

const excludeControls = [
    'letter-spacing',
    'line-height',
    'clear',
    'headings',
    'list-ol',
    'list-ul',
    'remove-styles',
    'superscript',
    'subscript',
    'hr',
    'text-align'
];

class Revise extends Component {

    state = {
        uploading: false,
        title: '',
        content: ''
    };

    componentDidMount = async (v) => {
        await this.getData();

        this.props.form.setFieldsValue({
            content: BraftEditor.createEditorState(this.state.content)
        })
    };

    getData = async (v) => {
        try {
            let config = {
                headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
            };
            const response = await axios.get(
                "http://127.0.0.1:8000/api/comment/my_articles/" + this.props.match.params.articleID,
                config
            );
            this.setState({
                title: response.data.title,
                content: response.data.content,
                originality: response.data.originality === 'Y'
            })
        } catch (error) {
            console.log(error)
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                this.setState({
                    uploading: true
                });
                const submitData = {
                    title: values.title,
                    content: values.content.toHTML(),
                    originalitySwitch: values.originalitySwitch
                };
                try {
                    const response = await axios.patch(
                        "http://127.0.0.1:8000/api/comment/my_articles/" + this.props.match.params.articleID,
                        {
                            title: submitData.title,
                            content: submitData.content,
                            originality: submitData.originalitySwitch === true ? 'Y' : 'N'
                        },
                        {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
                    );
                    this.setState({
                        uploading: false
                    });
                    if (response.status === 200) {
                        openNotificationWithIconS('success')
                        this.props.history.replace('/profile')
                    }
                } catch (error) {
                    openNotificationWithIconE('error')
                }
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Layout style={{minHeight: '100vh'}}>
                <Row style={{backgroundColor: '#fff', paddingTop: '30px'}}>
                    <Col xxl={{span: 12, offset: 6}} xl={{span: 16, offset: 4}} xs={{span: 22, offset: 1}}>
                        <div className='editor-wrapper'>
                            <Form onSubmit={this.handleSubmit} className='text-editor-form'>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-between'
                                }}>
                                    <Form.Item>
                                        <Button loading={this.state.uploading} type='primary' htmlType='submit'>
                                            Save
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('originalitySwitch', {
                                            initialValue: this.state.originality,
                                            rules: []
                                        })(<Switch checkedChildren='原创' unCheckedChildren='转载整理'/>)}
                                    </Form.Item>
                                </div>
                                <Form.Item>
                                    {getFieldDecorator('title', {
                                        initialValue: this.state.title,
                                        rules: [{
                                            required: true,
                                            message: 'Please input title here.'
                                        }]
                                    })(
                                        <Input size='large'/>
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('content', {
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true,
                                            validator: (_, value, callback) => {
                                                if (value.isEmpty()) {
                                                } else {
                                                    callback()
                                                }
                                            }
                                        }]
                                    })(
                                        <BraftEditor
                                            className='my-editor'
                                            excludeControls={excludeControls}
                                            placeholder='Please write down your ideas!'
                                            media={{image: true}}
                                            language="en"
                                        />
                                    )}
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const ReviseArticle = withRouter(Form.create()(Revise));
export default ReviseArticle