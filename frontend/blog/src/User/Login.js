import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actions from '../Store/actions/auth';
import {Redirect} from 'react-router-dom';

class LoginForm extends React.Component {

        state = {
            username: '',
            password: '',
        };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.username, this.state.password);
    };


    render() {
        const {error, token} = this.props;

        if (token) {
            return <Redirect to="/profile"/>;
        }
        return (
            <div>
                {
                    this.props.loading ?
                        <div style={{height: '100vh'}}>
                            <p style={{paddingTop: '10em', textAlign: 'center'}}>Waiting...</p>
                            <div className="ui active centered inline loader">
                                {token &&
                                <Redirect to="/profile"/>
                                }
                            </div>
                        </div>
                        :
                        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                            <Grid.Column style={{maxWidth: 450}}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Log-in to your account
                                </Header>
                                {error &&
                                <div>
                                    <Message color='red'>
                                        <Message.Header align='left'>Error</Message.Header>
                                        <Message.List>
                                            <Message.Item>
                                                {this.props.error.message}
                                            </Message.Item>
                                        </Message.List>
                                    </Message>
                                </div>
                                }
                                <Form size='large' onSubmit={this.handleSubmit}>
                                    <Segment stacked>
                                        <Form.Input
                                            fluid icon='user'
                                            iconPosition='left'
                                            placeholder='Username'
                                            onChange={(e) => this.setState({username: e.target.value})}
                                            name="username"
                                            required={true}
                                            error={this.state.usernameError}
                                        />
                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            placeholder='Password'
                                            type='password'
                                            onChange={(e) => this.setState({password: e.target.value})}
                                            name={"password"}
                                            error={this.state.passwordError}
                                            required={true}
                                        />
                                        <Button color='teal' fluid size='large'>
                                            Login
                                        </Button>
                                    </Segment>
                                </Form>
                                <Message>
                                    New to us? <a href={'/signup/'}>Sign Up</a>
                                </Message>
                            </Grid.Column>
                        </Grid>
                }
            </div>
        )

    }


}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
