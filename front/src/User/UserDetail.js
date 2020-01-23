import React from 'react';
import {connect} from 'react-redux';
import axios from "axios";

class UserDetail extends React.Component {

    state = {
        user: {},
    };

    componentDidMount() {
        const token = this.props.token;
        axios.get('http://127.0.0.1:8000/rest-auth/user/', {
            headers: {'Authorization': 'Token ' + token}
        }).then(res => {
            this.setState({
                user: res.data
            })
        });
    }

    render() {
        return (
            <div style={{height: '100vh'}}>
                <p>{this.state.user.username}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        token: state.auth.token
    }
);


export default connect(mapStateToProps)(UserDetail);
