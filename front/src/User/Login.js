import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../Store/actions/auth';
import {Form, Icon, Input, Button, Checkbox, Layout, Row, Col, message} from 'antd';

class LoginForm extends React.Component {

    state = {
        username: '',
        password: '',
    };

    LoginForm = async (values) => {
        try {
            this.props.onAuth(values.username, values.password);
            message.success('Welcome Back ' + values.username + '!');
            this.props.history.replace('/article')
        } catch (error) {
            message.error('The username or password is incorrect!');
            console.log(error)
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.LoginForm(values)
            }
        })
    };

    // render() {
    //     const {error, token} = this.props;
    //
    //     return (
    //         <div>
    //             {
    //                 this.props.loading ?
    //                     <div style={{height: '100vh'}}>
    //                         <p style={{paddingTop: '10em', textAlign: 'center'}}>Waiting...</p>
    //                         <div className="ui active centered inline loader">
    //                             {token &&
    //                             <Redirect to="/profile"/>
    //                             }
    //                         </div>
    //                     </div>
    //                     :
    //                     <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
    //                         <Grid.Column style={{maxWidth: 450}}>
    //                             <Header as='h2' color='teal' textAlign='center'>
    //                                 Log-in to your account
    //                             </Header>
    //                             {error &&
    //                             <div>
    //                                 <Message color='red'>
    //                                     <Message.Header align='left'>Error</Message.Header>
    //                                     <Message.List>
    //                                         <Message.Item>
    //                                             {this.props.error.message}
    //                                         </Message.Item>
    //                                     </Message.List>
    //                                 </Message>
    //                             </div>
    //                             }
    //                             <Form size='large' onSubmit={this.handleSubmit}>
    //                                 <Segment stacked>
    //                                     <Form.Input
    //                                         fluid icon='user'
    //                                         iconPosition='left'
    //                                         placeholder='Username'
    //                                         onChange={(e) => this.setState({username: e.target.value})}
    //                                         name="username"
    //                                         required={true}
    //                                         error={this.state.usernameError}
    //                                     />
    //                                     <Form.Input
    //                                         fluid
    //                                         icon='lock'
    //                                         iconPosition='left'
    //                                         placeholder='Password'
    //                                         type='password'
    //                                         onChange={(e) => this.setState({password: e.target.value})}
    //                                         name={"password"}
    //                                         error={this.state.passwordError}
    //                                         required={true}
    //                                     />
    //                                     <Button color='teal' fluid size='large'>
    //                                         Login
    //                                     </Button>
    //                                 </Segment>
    //                             </Form>
    //                             <Message>
    //                                 New to us? <a href={'/signup/'}>Sign Up</a>
    //                             </Message>
    //                         </Grid.Column>
    //                     </Grid>
    //             }
    //         </div>
    //     )
    //
    // }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout style={{minHeight: "100vh"}}>
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
                                    <a className="login-form-forgot" href="">
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

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginForm));


