import React, {Component} from 'react'
import axios from "axios";
import {BackTop, Col, Divider, Layout, Row, Upload, message, Typography, Form, Button, Icon, notification} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const {Title} = Typography;
const {Dragger} = Upload;


function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('File size must smaller than 2MB!')
    }
    return isLt2M
}

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
};

class MovieStillsEditor extends Component {

    state = {
        loading: false,
        movieId:"",
    };

    componentDidMount() {
        //get the new movie data
        axios.get('http://127.0.0.1:8000/api/movie/movies/?name=' + this.props.location.state.name)
            .then(res => {
                this.setState({
                    movieId: res.data.results[0].id,
                });
            })
            .catch(err => {
                console.log(err)
            });
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
            info.onSuccess(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (error, values) => {
            let tmpArray = [];
            values.stills.map((still) =>
                tmpArray.push(still.response.data.link)
            );
            console.log(tmpArray);
            tmpArray.map((still) =>
                axios.post('http://127.0.0.1:8000/api/movie/stills/',
                    {
                        photo: still,
                        movie: this.state.movieId
                    },
                    {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
                ).then(response => {
                    this.setState({
                        loading: false,
                    });
                    console.log(response.data);
                    if (response.status === 201) {
                        this.setState({
                            stillsDataState: true,
                        });
                        openNotificationWithIconS('success');
                        this.props.history.replace({
                            pathname: '/video_source_upload',
                            state: {name: this.props.location.state.name}
                        })

                    }
                }).catch(error => {
                    console.log(error.response.data);
                    if (error.response.status === 403) {

                        openNotificationWithIconE('error');
                        this.setState({
                            loading: false
                        })
                    }
                })
            );
        })
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
                            borderRadius: '2px',
                            minHeight: '65l0px'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                                <Title level={3}>Step 2 - Upload Movie Stills</Title>
                                <Divider type='vertical'/>
                                <Link to='/editor_guidance'>Note to editors</Link>
                            </div>
                            <Form onSubmit={this.handleSubmit} className='movie-editor-form'
                                  style={{paddingTop: '40px'}}>
                                <Form.Item label='Movie Stills'>
                                    {getFieldDecorator('stills', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                        // rules: {
                                        //     required: true,
                                        //     message: 'Please upload files!'
                                        // }
                                    })(
                                        <Dragger multiple name='stills'
                                                 action='https://api.imgur.com/3/image'
                                                 customRequest={this.customRequest}
                                                 beforeUpload={beforeUpload}>
                                            <p className="ant-upload-drag-icon">
                                                <Icon type="inbox"/>
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk upload. Strictly prohibit from uploading
                                                company data or other
                                                band files
                                            </p>
                                        </Dragger>
                                    )}
                                </Form.Item>
                                <Button type='primary' htmlType='submit' loading={this.state.loading}>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}

const MovieStillsSourceEditor = connect()(Form.create()(MovieStillsEditor));

export default MovieStillsSourceEditor
