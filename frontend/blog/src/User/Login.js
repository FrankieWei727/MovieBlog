import React from 'react'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actions from '../Store/actions/auth';

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
            errorMessage: '',
            complete: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.username, this.state.password);
        this.props.history.push('/home');
    }


    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <div>
                    <p>{this.state.errorMessage}</p>
                </div>
            )
        }

        return (
            <div>
                {errorMessage}
                {
                    this.props.loading ?

                        <div style={{height: '100vh'}}>
                            <p style={{paddingTop: '10em', textAlign: 'center'}}>Waiting...</p>
                            <div className="ui active centered inline loader">
                            </div>
                        </div>
                        :
                        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                            <Grid.Column style={{maxWidth: 450}}>
                                <Header as='h2' color='teal' textAlign='center'>
                                    Log-in to your account
                                </Header>
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
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
