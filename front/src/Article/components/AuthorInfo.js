import React, {Component} from 'react'
import {Card, Avatar, Tag} from 'antd'
import axios from 'axios'
import {Link} from 'react-router-dom'

const {Meta} = Card;

class AuthorInfo extends Component {
    state = {
        data: [],
        urlAvatar: '',
        username: '',
        bio: '',
        id: '',
        profession: '',
        userId : "",
    };

    componentDidUpdate(prevProps) {
        if (prevProps.authorId !== this.props.authorId) {
            this.getProfileData();
            this.getUserData()
        }
    }

       getUserData = async (v) => {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            try {
                const response = await axios.get(
                    'rest-auth/user/',
                    {headers: {'Authorization': 'Token ' + token}}
                );
                this.setState(function (state) {
                    return {
                        userId: response.data.id,
                    }
                })
            } catch (error) {
                // console.log(error)
            }
        }
    };

    getProfileData = async (v) => {
        try {
            const response = await axios.get(
                'api/account/users/' + this.props.authorId + '/?format=json'
            );
            this.data = response.data.results;
            this.setState({
                urlAvatar: response.data.profile.avatar,
                username: response.data.username,
                bio: response.data.profile.bio,
                id: response.data.id,
                profession: response.data.profile.profession
            })
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        return (
            <Card title={<div style={{fontWeight: 'bold'}}>About author</div>} bordered style={{
                background: '#fff',
                fontWeight: 'bold',
                borderRadius: '1px',
                boxShadow: '0 1px 3px rgba(26,26,26,.1)'
            }}>
                <Meta
                    avatar={<Link
                        to={this.state.id === this.state.userId ? '/profile' : '/visit/profile/' + this.state.id}><Avatar
                        shape='square' src={this.state.urlAvatar}/></Link>}
                    title={<div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{
                                fontWeight: 'bold',
                                color: '#000',
                                marginRight: '6px'
                            }}>{this.state.username}</span>
                            {this.state.profession && <Tag color='#f50'>{this.state.profession}</Tag>}
                        </div>
                    </div>}
                    description={this.state.bio}
                />
            </Card>
        )
    }
}

export default AuthorInfo
