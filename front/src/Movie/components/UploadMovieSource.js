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
    Divider,
    BackTop,
    Tag,
    DatePicker,
} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';


const {MonthPicker} = DatePicker;
const {CheckableTag} = Tag;

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
};
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
        loading: false,
        selectedTags: [],
        tagsFromServer: [],
        movieName: "",
    };
    componentDidMount = async v => {
        await this.getCategoryData();
    };

    getCategoryData = async v => {
        await axios.get('http://127.0.0.1:8000/api/movie/categories/?format=json')
            .then(res => {
                this.setState({
                    tagsFromServer: res.data,
                });
            })
            .catch(err => {
                console.log(err)
            })

    };

    handleChange(tag, checked) {
        const {selectedTags} = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        // console.log('You are interested in: ', nextSelectedTags);
        this.setState({selectedTags: nextSelectedTags});
        // console.log(selectedTags)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (error, values) => {
                this.setState({
                    loading: true,
                });
                let cateArray = [];
                this.state.selectedTags.map((tag) =>
                    cateArray.push(tag.id)
                );

                if (!error) {
                    this.setState({
                        loading: true,
                    });
                    const submitData = {
                        name: values.name,
                        region: values.region,
                        length: values.length,
                        poster: values.poster ? values.poster[0].response.data.link : '',
                        description: values.description,
                        actors: values.actors,
                        director: values.director,
                        scriptwriter: values.scriptwriter,
                        category: cateArray,
                        video: values.video,
                        release_date: values.release_date,
                        language: values.language,
                    };
                    await axios.post(
                        'http://127.0.0.1:8000/api/movie/create_movie/',
                        {
                            name: submitData.name,
                            region: submitData.region,
                            length: submitData.length,
                            description: submitData.description,
                            actors: submitData.actors,
                            director: submitData.director,
                            scriptwriter: submitData.scriptwriter,
                            poster: submitData.poster,
                            category: submitData.category,
                            video: submitData.video,
                            release_date: submitData.release_date,
                            language: submitData.language,
                        },
                        {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
                    ).then(response => {
                        console.log(response.data);
                        this.setState({
                            loading: false,
                            movieName: values.name
                        });
                        if (response.status === 201) {
                            openNotificationWithIconS('success');
                            this.props.history.replace({pathname: '/stills_upload', state: {name: this.state.movieName}})
                        }
                    }).catch(error => {
                            console.log(error.response.data);
                            if (error.response.status === 403) {
                                openNotificationWithIconE('error');
                                this.setState({
                                    loading: false
                                })
                            }
                        }
                    );
                }
            }
        )
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

    render() {
        const {getFieldDecorator} = this.props.form;
        const {selectedTags, tagsFromServer} = this.state;

        return (
            <Layout style={{minHeight: '100vh', backgroundColor: '#f7f7f7',paddingTop:'60px'}}>
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
                                <Title level={3}>Step 1 - Upload Basic Movie Info</Title>
                                <Divider type='vertical'/>
                                <Link to='/editor_guidance'>Note to editors</Link>
                            </div>
                            <Form onSubmit={this.handleSubmit} className='movie-editor-form'>
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
                                <Form.Item
                                    label='Category'>
                                    {getFieldDecorator('category', {
                                        rules: [
                                            {}
                                        ]
                                    })(<div>
                                        {tagsFromServer.map(tag => (
                                            <CheckableTag
                                                key={'upload_movie_tags' + tag.id}
                                                checked={selectedTags.indexOf(tag) > -1}
                                                onChange={checked => this.handleChange(tag, checked)}
                                            >
                                                {tag.name}
                                            </CheckableTag>
                                        ))}
                                    </div>)}
                                </Form.Item>
                                <Form.Item
                                    label='Language'>
                                    {getFieldDecorator('language', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the language of movie!'
                                            }
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label="Release Date">
                                    {getFieldDecorator('release_date', {
                                        rules: [{type: 'object', required: true, message: 'Please select time!'}]
                                    })(<MonthPicker/>)}
                                </Form.Item>
                                <Form.Item label='Region'>
                                    {getFieldDecorator('region', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the produced region of movie!'
                                            }
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Director'>
                                    {getFieldDecorator('director', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the director of movie!'
                                            }
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Actor'>
                                    {getFieldDecorator('actors', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the actors of movie!'
                                            }
                                        ]
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label='Scriptwriter'>
                                    {getFieldDecorator('scriptwriter', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input the scriptwriter of movie!'
                                            }
                                        ]
                                    })(<Input/>)}
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
                                <Form.Item
                                    label='Movie trailer'>
                                    {getFieldDecorator('video', {
                                        rules: [
                                            {}
                                        ]
                                    })(<Input
                                        placeholder='Example: www.youtube.com/embed/FnCdOQsX5kc.'
                                    />)}
                                </Form.Item>
                                <Form.Item label='Description'>
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {}
                                        ]
                                    })(<TextArea
                                        placeholder='Say something about the movie...'
                                        autoSize={{minRows: 8, maxRows: 30}}
                                    />)}
                                </Form.Item>
                                <Form.Item label='Movie Cover'>
                                    {getFieldDecorator('poster', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile
                                    })(
                                        <Upload name='cover'
                                                action='https://api.imgur.com/3/image'
                                                listType='picture'
                                                customRequest={this.customRequest}
                                                beforeUpload={beforeUpload}>
                                            <Button>
                                                <Icon type='upload'/> Click to upload
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
