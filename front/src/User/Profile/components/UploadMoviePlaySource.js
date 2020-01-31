import React, {Component} from "react";
import {BackTop, Button, Col, Divider, Form, Icon, Layout, Row, Typography, Input} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";

const {Title} = Typography;
let id = 0;

class MoviePlaySource extends Component {

    componentDidMount() {
        //get the new movie data
        axios.get('http://127.0.0.1:8000/api/movie/movies?name=' + this.props.location.state.name)
            .then(res => {
                this.setState({
                    movieId: res.data.results[0].id,
                });
            })
            .catch(err => {
                console.log(err)
            });
    };

    remove = k => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {keys, websites, urls} = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => websites[key]));
                console.log('Merged values:', keys.map(key => urls[key]));
            }
        });
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 14},
        };

        const buttonItemLayout = {
            wrapperCol: {span: 14, offset: 4},
        };

        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: [1]});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k) => (
            <div>
                <Form.Item label="Url"
                           required={true}
                           key={k}
                           {...formItemLayout}
                >
                    {getFieldDecorator(`urls[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input the url or delete this field.",
                            },
                        ],
                    })(<Input placeholder="video url" style={{marginRight: 8, width: '90%'}}/>)}
                </Form.Item>
                <Form.Item label="Website"
                           required={true}
                           key={k}
                           {...formItemLayout}
                >
                    {getFieldDecorator(`websites[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: "Please input website's name or delete this field.",
                            },
                        ],
                    })(<Input placeholder="website name" style={{marginRight: 8, width: '90%'}}/>)}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </Form.Item>
            </div>

        ));
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
                                <Title level={3}>Step 3 - Upload Movie Play Source</Title>
                                <Divider type='vertical'/>
                                <Link to='/editor_guidance'>Note to editors</Link>
                            </div>
                            <Form onSubmit={this.handleSubmit}>
                                {formItems}
                                <Form.Item {...buttonItemLayout}>
                                    <Button type="dashed" onClick={this.add} style={{width: '80%'}}>
                                        <Icon type="plus"/> Add field
                                    </Button>
                                </Form.Item>
                                <Form.Item {...buttonItemLayout}>
                                    <Button type="primary" htmlType="submit">
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

const MoviePlaySourceEditor = connect()(Form.create()(MoviePlaySource));

export default MoviePlaySourceEditor