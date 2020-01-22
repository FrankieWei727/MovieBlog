import React, {Component} from 'react'
import {Comment, Avatar, Form, Button, List, Input, message} from 'antd'
import moment from 'moment'
import axios from 'axios'
import {Link} from 'react-router-dom'

const TextArea = Input.TextArea;

const CommentList = ({comments, username}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout='horizontal'
        renderItem={item => (
            <Comment
                author={item.user ? item.user.username : item.username}
                avatar={item.user ? (<Link
                    to={(item.user.username + '' === username ? '/profile/' : '/visit/') + item.user.id}><Avatar
                    src={item.user.profile.avatar}/></Link>) : (<Link
                    to={(item.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + item.id}><Avatar
                    src={item.user ? item.avatar : item.avatar}/></Link>)}
                content={item.content}
                datetime={moment(moment(item.created).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss").fromNow()}
            />
        )}
    />
);

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button
                htmlType='submit'
                loading={submitting}
                onClick={onSubmit}
                type='primary'
            >
                Submit
            </Button>
        </Form.Item>
    </div>
);

const count = 8;

class AddMovieReview extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        cache: [],
        loading: false,
        initLoading: true,
        page: 1,
        username: '',
        avatarUrl: '',
        user: {}
    }

    componentDidMount = async (v) => {
        this.getUserData();
        if (this.props.movieId) {
            await this.getCommentData();
            this.setState(function (state) {
                return {initLoading: false}
            })
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (prevProps.movieId !== this.props.movieId) {
            await this.getCommentData();
            this.setState(function (state) {
                return {initLoading: false}
            })
        }
    };

    getUserData = async (v) => {
        try {
            let config = {
                headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
            };
            const response = await axios.get(
                'http://127.0.0.1:8000/rest-auth/user/',
                config
            );
            this.setState(function (state) {
                return {username: response.data.username, avatarUrl: response.data.profile.avatar, user: response.data};
            })
        } catch (error) {
            console.log(error)
        }

    };
    getCommentData = async (v) => {
        if (this.props.movieId) {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/comment/reviews/?format=json&page=' + this.state.page + '&page_size=' + count + '&movie=' + this.props.movieId
                );
                this.comments = response.data.results;
                this.setState(function (state) {
                    return {comments: response.data.results, cache: response.data.results}
                })
            } catch (error) {
                console.log(error)
            }
        }
    };

    sendComment = async (value) => {
        try {
            let config = {
                headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
            };
            const response = await axios.post(
                'http://127.0.0.1:8000/api/comment/reviews/',
                {
                    content: value,
                    movie: this.props.movieId,
                    rank: 4,
                },
                config
            );
            console.log(response);
            if (response.status !== 201) {
                message('error')
            }
        } catch (error) {
            console.log(error)
        }
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return
        }
        this.setState({
            submitting: true
        });
        this.sendComment(this.state.value);
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    {
                        username: this.state.username,
                        avatar: this.state.avatarUrl,
                        content: <p>{this.state.value}</p>,
                        created: moment()
                    }
                ]
            })
        }, 500)
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    render() {
        const {comments, username, submitting, value} = this.state;
        let comment_number = 0;
        if (this.state.comments)
            comment_number = this.state.comments.length;
        else
            comment_number = 0;
        return (
            <div>
                {comment_number > 0 && <CommentList comments={comments} username={username}/>}
                {window.localStorage.getItem('token') !== null ?
                    <div><Comment
                        avatar={(
                            <Avatar
                                src={this.state.avatarUrl}
                                alt={this.state.username}
                            />
                        )}
                        content={(
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={submitting}
                                value={value}
                            />
                        )}
                    /></div> :
                    <div style={{paddingTop:'20px',paddingBottom:'40px'}}>
                        <p style={{color: '#8E9193', fontWeight: '700'}}>Please Login to write a
                            review...</p>
                    </div>
                }
            </div>
        )
    }
}

export default AddMovieReview
