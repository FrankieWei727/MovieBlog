import React from 'react';
import {Button, Grid, Header, Form, Input, Message} from 'semantic-ui-react';
import * as actions from "../Store/actions/auth";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class RegistrationForm extends React.Component {

    state = {
        username: "",
        email: "",
        password1: "",
        password2: ""
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleSubmit = e => {
        e.preventDefault();
        const {username, email, password1, password2} = this.state;
        this.props.signup(username, email, password1, password2);
    };

    render() {
        const {username, email, password1, password2} = this.state;
        const {error, token, errorMsg} = this.props;

        if (token) {
            return <Redirect to="/home"/>;
        }
        return (

            <div>
                {
                    <Grid style={{height: '200vh'}}>
                        <Grid.Column style={{maxWidth: 600}}>
                            <div style={{paddingLeft: '10em', paddingTop: '10em'}}>
                                <Header as='h2' color='teal'>
                                    Create a new account
                                </Header>
                                {error &&
                                <div>
                                    <Message color='red'>
                                        <Message.Header>Error</Message.Header>
                                        <Message.List>
                                            {errorMsg.password1 && this.props.errorMsg.password1.map((Msg) =>
                                                <Message.Item key={'password1Msg' + Msg.id}>
                                                    {Msg}
                                                </Message.Item>
                                            )}
                                            {errorMsg.username && this.props.errorMsg.username.map((Msg) =>
                                                <Message.Item key={'usernameMsg' + Msg.id}>
                                                    {Msg}
                                                </Message.Item>
                                            )}
                                            {errorMsg.non_field_errors && this.props.errorMsg.non_field_errors.map((Msg) =>
                                                <Message.Item key={'non_field_errorsMsg' + Msg.id}>
                                                    {Msg}
                                                </Message.Item>
                                            )}
                                        </Message.List>
                                    </Message>
                                </div>
                                }
                                <Form style={{paddingTop: '3em',paddingBottom: '1em'}} onSubmit={this.handleSubmit}>
                                    <Form.Field required>
                                        <label>Username</label>
                                        <Input
                                            placeholder='username'
                                            name='username'
                                            value={username}
                                            required={true}
                                            onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Email</label>
                                        <Input placeholder='email'
                                               name='email'
                                               value={email}
                                               type='email'
                                               onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Password</label>
                                        <Input placeholder='password'
                                               name='password1'
                                               value={password1}
                                               type='password'
                                               required={true}
                                               onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Confirm Password</label>
                                        <Input placeholder='confirm password'
                                               name='password2'
                                               value={password2}
                                               type='password'
                                               required={true}
                                               onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Button color='teal' fluid size='large' style={{maxWidth: 200}}>
                                        Sign Up
                                    </Button>
                                </Form>
                            </div>
                        </Grid.Column>
                    </Grid>
                }
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)