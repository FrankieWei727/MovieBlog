import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../Store/actions/auth';
import {Form, Icon, Input, Button, Checkbox, Layout, Row, Col, message} from 'antd';
import axios from "axios";

class LoginForm extends React.Component {

    state = {
        username: '',
        usernameError: null,
    };


    LoginForm = (values) => {
        this.setState({
            username: values.username
        });
        try {
            this.props.onAuth(values.username, values.password);

            if (this.state.usernameError !== null) {
                message.error('The username is not exist!');
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleError() {
        this.setState({
            usernameError: "The username is not exist!"
        });
    };

    setUser = (username) => {
        this.setState({
            username: username,
            usernameError: null
        })
    };

    checkUsername = async (e) => {
        const username = e.target.value;
        await axios.get('http://127.0.0.1:8000/api/account/user_name/validate/' + username)
            .then(res => {
                this.setUser(username)
            }).catch(err => {
                this.handleError()
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.LoginForm(values)
            }
        })
    };


    render() {
        if (this.props.token) {
            message.success('Welcome Back ' + this.state.username + '!');
            if (this.state.username === "admin") {
                this.props.history.replace('admin_mlinked');
            } else {
                this.props.history.replace({pathname: '/article', state: {token: this.props.token}});
            }
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout style={{minHeight: "100vh", paddingTop: '60px'}}>
                <div style={{flex: "1 0 "}}>
                    <Row style={{margin: '40px 40px 30px 30px'}}>
                        <Col
                            xxl={{span: 10, offset: 7}}
                            xl={{span: 12, offset: 6}}
                            xs={{span: 22, offset: 1}}
                            style={{background: 'white', padding: '40px 50px', boxShadow: "0px 2px 2px #888888"}}
                        >
                            <h1>Welcome</h1>
                            <Form onSubmit={this.handleSubmit} className="login-form"
                                  style={{maxWidth: "300px"}}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="Username"
                                            onChange={this.checkUsername}
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className="login-form-forgot" href="/">
                                        Forgot password
                                    </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{width: "100%"}}>
                                        Log in
                                    </Button>
                                    No account? <a href="">register now!</a>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));


