import React, {Component} from "react";
import {Layout, Form, Input, Tooltip, Icon, Row, Col, Button, Checkbox} from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import * as actions from "../Store/actions/auth";
import {connect} from 'react-redux';

const FormItem = Form.Item;

class Register extends Component {
    state = {
        confirmDirty: false,
        emailValidateStatus: "",
        emailError: "",
        usernameError: "",
        passwordError: "",
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };


    validateToNextPassword = async (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], {force: true});
        }
        await axios.get(
            'api/account/user_password/validate/' + value)
            .then(res => {
                this.setState({
                    passwordError: res.data.data[0],
                });
            }).catch(e => {
                this.setState({
                    passwordError: null
                })
            });
        if (this.state.passwordError) {
            callback(this.state.passwordError);
        } else {
            callback();
        }
    };


    validateToUsername = async (rule, value, callback) => {
        await axios.get('api/account/user_name/validate/' + value)
            .then(response => {
                if (value === response.data.username) {
                    this.setState({
                        usernameError: "This username has been registered!",
                    });
                }
            }).catch(err => {
                this.setState({
                    usernameError: null
                });
            });
        if (this.state.usernameError) {
            callback(this.state.usernameError);
        } else {
            callback();
        }
    };


    validateToEmail = async (rule, value, callback) => {
        await axios.get('api/account/user_email/validate/' + value)
            .then(response => {
                if (value === response.data.email) {
                    this.setState({
                        emailError: "This email address has been registered!",
                    });
                }
            }).catch(err => {
                this.setState({
                    emailError: null
                });
            });
        if (this.state.emailError) {
            callback(this.state.emailError);
        } else {
            callback();
        }
    };

    Auth = async v => {
        try {
            this.props.signup(v.username, v.email, v.password, v.confirm);
            if (this.state.token !== null) {
                this.props.history.replace("/article");
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.Auth(values);
            }
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        return (
            <Layout style={{minHeight: "100vh", paddingTop: '60px'}}>
                <div style={{flex: "1 0 "}}>
                    <Row style={{margin: '30px 0'}}>
                        <Col
                            xxl={{span: 10, offset: 7}}
                            xl={{span: 12, offset: 6}}
                            xs={{span: 22, offset: 1}}
                            style={{background: 'white', padding: '50px 40px', maxWidth: "600px"}}>
                            <h1 style={{fontSize: "40px"}}>Welcome</h1>
                            <p style={{
                                color: "#586069",
                                fontSize: "20px",
                                paddingBottom: "20px"
                            }}>
                                Mlinked is here!
                            </p>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign='left' layout='vertical'>
                                <FormItem
                                    hasFeedback
                                    label={
                                        <span>
                                            Username&nbsp;
                                            <Tooltip title="Who are you">
                                                 <Icon type="question-circle-o"/>
                                             </Tooltip>
                                        </span>}>
                                    {getFieldDecorator("username", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please input your username!",
                                                whitespace: true
                                            },
                                            {
                                                validator: this.validateToUsername
                                            }
                                        ]
                                    })(<Input/>)}
                                </FormItem>
                                <FormItem label="E-mail" hasFeedback>
                                    {getFieldDecorator("email", {
                                        rules: [
                                            {
                                                type: "email",
                                                message: "The input is not valid E-mail!"
                                            },
                                            {
                                                required: true,
                                                message: "Please input your E-mail!"
                                            },
                                            {
                                                validator: this.validateToEmail
                                            }
                                        ]
                                    })(<Input/>)}
                                </FormItem>
                                <FormItem label="Password" hasFeedback>
                                    {getFieldDecorator("password", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please input your password!"
                                            },
                                            {
                                                validator: this.validateToNextPassword
                                            }
                                        ]
                                    })(<Input.Password/>)}
                                </FormItem>
                                <FormItem label="Confirm Password" hasFeedback>
                                    {getFieldDecorator("confirm", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please confirm your password!"
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            }
                                        ]
                                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    {getFieldDecorator("agreement", {
                                        valuePropName: "checked"
                                    })(
                                        <Checkbox>
                                            I have read the <Link to="agreement">agreement</Link>
                                        </Checkbox>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Register
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (username, email, password1, password2) =>
            dispatch(actions.authSignup(username, email, password1, password2)),
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        errorMsg: state.auth.errorMsg,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register));
