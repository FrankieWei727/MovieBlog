import React, {Component} from 'react'
import {Comment, Avatar, Form, Button, List, Input, message} from 'antd'
import moment from 'moment'
import axios from 'axios';


import AvatarFlow from "./AvatarFlow";

const TextArea = Input.TextArea;
const token = window.localStorage.getItem('token');

const CommentList = ({comments, userId, user}) => (
    <List style={{paddingBottom: '40px'}}
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout='horizontal'
          renderItem={item => (
              <Comment
                  author={item.author ? item.author.username : item.username}
                  avatar={
                      (item.author ?
                              <AvatarFlow author={item.author} userId={userId}/>
                              :
                              <AvatarFlow author={user} userId={userId}/>
                      )}
                  content={item.content}
                  datetime={moment(moment(item.created).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss").fromNow()}
              />
          )}
    />
);

const Editor = ({
                    onChange, onSubmit, submitting, value
                }) => (
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

class CreateArticleComment extends Component {
    state = {
        user: {},
        id: null,
        comments: [],
        submitting: false,
        value: '',
        cache: [],
        loading: false,
        initLoading: true,
        page: 1,
        username: '',
        avatar: ''
    };

    componentDidMount = async (v) => {
        this.getUserData();
        if (this.props.articleId) {
            await this.getCommentData();
            this.setState(function (state) {
                return {initLoading: false}
            })
        }
    };

    componentDidUpdate = async (prevProps) => {
        if (prevProps.articleId !== this.props.articleId) {
            await this.getCommentData();
            this.setState(function (state) {
                return {initLoading: false}
            })
        }
    };

    getUserData = async (v) => {
        if (token !== null) {
            try {
                const response = await axios.get(
                    'rest-auth/user/',
                    {headers: {'Authorization': 'Token ' + token}}
                );
                this.setState(function (state) {
                    return {
                        user: response.data,
                        id: response.data.id,
                        username: response.data.username,
                        avatar: response.data.profile.avatar
                    }
                })
            } catch (error) {
                // console.log(error)
            }
        }
    };

    async getCommentData() {
        if (this.props.articleId) {
            try {
                const response = await axios.get(
                    'api/comment/article_comments/?format=json&page='
                    + this.state.page + '&page_size='
                    + count + '&article='
                    + this.props.articleId
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
        await axios.post(
            'api/comment/article_comments/',
            {
                content: value,
                article: this.props.articleId
            },
            {headers: {'Authorization': 'Token ' + token}}
        ).catch(err => {
            console.log(err);
            message('error');
        });
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
                        avatar: this.state.avatar,
                        content: <p>{this.state.value}</p>,
                        pub_date: moment()
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
        const {comments, submitting, value, user} = this.state;
        return (
            <div>
                {token !== null ?
                    <div>
                        <Comment
                            avatar={(
                                <Avatar
                                    shape='square'
                                    src={this.state.avatar}
                                    alt={user.username}
                                />
                            )}
                            content={(
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            )}/>
                    </div>
                    :
                    <div style={{paddingTop: '20px', paddingBottom: '40px'}}>
                        <p style={{color: '#8E9193', fontWeight: '700'}}>Please Login to write a
                            comment...</p>
                    </div>
                }
                {comments.length > 0 &&
                <CommentList comments={comments} userId={user.id} user={user}/>}
            </div>
        )
    }
}

export default CreateArticleComment
