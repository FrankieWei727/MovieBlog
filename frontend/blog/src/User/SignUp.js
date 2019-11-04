import React from 'react'
import {Button, Form, Grid, Header, Input} from 'semantic-ui-react'
import * as actions from "../Store/actions/auth";
import {connect} from 'react-redux';

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password1: '',
            password2: '',
            email: '',

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.username,
            this.state.password1,
            this.state.password2,
            this.state.email);
        console.log(this.state.username,
            this.state.password1,
            this.state.password2,
            this.state.email);
        this.props.history.push('/');
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
                    <Grid style={{height: '100vh'}}>
                        <Grid.Column style={{maxWidth: 450}}>
                            <div style={{paddingLeft: '10em', paddingTop: '10em'}}>
                                <Header as='h2' color='teal'>
                                    Create a new account
                                </Header>
                                <Form style={{paddingBottom: '1em'}} onSubmit={this.handleSubmit}>
                                    <Form.Field required>
                                        <label>Username</label>
                                        <Input
                                            placeholder='username'
                                            name='username'
                                            required={true}
                                            onChange={(e) => this.setState({username: e.target.value})}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Email</label>
                                        <Input placeholder='email'
                                               name='email'
                                               type='email'
                                               required={true}
                                               onChange={(e) => this.setState({email: e.target.value})}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Password</label>
                                        <Input placeholder='password'
                                               name='password1'
                                               type='password'
                                               required={true}
                                               onChange={(e) => this.setState({password1: e.target.value})}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Confirm Password</label>
                                        <Input placeholder='confirm password'
                                               name='password2'
                                               type='password'
                                               required={true}
                                               onChange={(e) => this.setState({password2: e.target.value})}/>
                                    </Form.Field>
                                    <Button color='teal' fluid size='large'>
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

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) =>
            dispatch(actions.authSignup(username, email, password1, password2))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)