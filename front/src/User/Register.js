import React, {Component} from "react";
import {Layout, Form, Input, Tooltip, Icon, Row, Col, Button, Checkbox, message} from "antd";
import axios from "axios";
import {Link} from "react-router-dom";
import * as actions from "../Store/actions/auth";
import {connect} from 'react-redux';

const FormItem = Form.Item;

class Register extends Component {
    state = {
        confirmDirty: false
    };

    componentDidMount() {
    }

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("password")) {
            window.callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], {force: true});
        }
        callback();
    };

    Join = async v => {
        try {
            const responseJoin = await axios.post(
                "https://finewf.club:8080/api/users/",
                {
                    username: v.username,
                    password: v.password,
                    email: v.email
                }
            );
            const response = await axios.post(
                "https://finewf.club:8080/api-token-auth/",
                {
                    username: v.username,
                    password: v.password
                }
            );
            window.localStorage.setItem("token", response.data.token);
            message.success("Join Successful, Welcome " + response.data.user_name);
            window.localStorage.setItem("user_id", response.data.user_id);
            this.props.history.replace("/home");
        } catch (error) {
            console.log(error);
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.Join(values);
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
            <Layout style={{minHeight: "100vh"}}>
                <div style={{flex: "1 0 "}}>
                    <Row style={{margin: '30px 0'}}>
                        <Col
                            xxl={{span: 10, offset: 7}}
                            xl={{span: 12, offset: 6}}
                            xs={{span: 22, offset: 1}}
                            style={{background: 'white', padding: '50px 40px'}}
                        >
                            <h1 style={{fontSize: "40px"}}>Join FWF</h1>
                            <p
                                style={{
                                    color: "#586069",
                                    fontSize: "20px",
                                    paddingBottom: "20px"
                                }}
                            >
                                Fine Water Flow, 细水宜长流
                            </p>
                            <Form onSubmit={this.handleSubmit} labelAlign='left' layout='vertical'>
                                <FormItem
                                    {...formItemLayout}
                                    label={
                                        <span>
                                            Username&nbsp;
                                            <Tooltip title="Who are you">
                                                 <Icon type="question-circle-o"/>
                                             </Tooltip>
                                        </span>}
                                >
                                    {getFieldDecorator("username", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please input your username!",
                                                whitespace: true
                                            }
                                        ]
                                    })(<Input/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="E-mail">
                                    {getFieldDecorator("email", {
                                        rules: [
                                            {
                                                type: "email",
                                                message: "The input is not valid E-mail!"
                                            },
                                            {
                                                required: true,
                                                message: "Please input your E-mail!"
                                            }
                                        ]
                                    })(<Input/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Password">
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
                                    })(<Input type="password"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Confirm Password">
                                    {getFieldDecorator("confirm", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please confirm your password!"
                                            },
                                            {
                                                validator: this.compareToFirstPassword
                                            }
                                        ]
                                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
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
