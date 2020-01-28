import React, {Component} from 'react'
import {Layout, Avatar, Row, Col, Tabs, Icon, Button, Typography, Tag, message} from 'antd'
import axios from 'axios'

import OtherUserArticleList from "../components/OtherUserArticleList";

const TabPane = Tabs.TabPane;
const {Paragraph} = Typography;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_9cj9xgq951n.js'
});

class VisitOtherUserProfile extends Component {
    state = {
        user: [],
        avatar: '',
        username: '',
        bio: '',
        follow: false,
        loading: false,
        profession: '',
        cover: ''
    };

    componentDidMount = async (v) => {
        await this.getProfileData();
        await this.isFollow()
    };

    isFollow = async (v) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/account/user/' + this.props.match.params.id + '/is_followed/?format=json',
                {},
                {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
            );
            this.setState({
                follow: (response.data.code === '1')
            })
        } catch (error) {
        }
    };

    follow = async (v) => {
        try {
            this.setState({loading: true});
            axios.post(
                'http://127.0.0.1:8000/api/account/user/' + this.props.match.params.id + '/follow/?format=json',
                {},
                {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
            ).then(res => {
                console.log(res.data);
            });
            setTimeout(() => {
                this.setState({
                    follow: true,
                    loading: false
                })
            }, 300);
            message.success('Follow successfully')
        } catch (error) {
        }
    };

    unfollow = async (v) => {
        try {
            this.setState({loading: true});
            let config = {
                headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}
            };
            axios.post(
                'http://127.0.0.1:8000/api/account/user/' + this.props.match.params.id + '/unfollow/?format=json',
                {},
                config
            );
            setTimeout(() => {
                this.setState({
                    follow: false,
                    loading: false
                })
            }, 300);
            message.success('Unfollow Successfully!')
        } catch (error) {
        }
    };

    getProfileData = async (v) => {
        await axios.get(
            'http://127.0.0.1:8000/api/account/users/' + this.props.match.params.id + '?format=json'
        ).then(res => {
            this.setState({
                user: res.data,
                avatar: res.data.profile.avatar,
                username: res.data.username,
                bio: res.data.profile.bio,
                profession: res.data.profile.profession,
                cover: res.data.profile.cover
            })
        }).catch(error => {
            console.log(error)
        });
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh', backgroundColor: '#f7f7f7'}}>
                <Row style={{marginTop: '15px'}}>
                    <Col xxl={{span: 14, offset: 5}} xl={{span: 20, offset: 2}} md={{span: 22, offset: 1}}
                         xs={{span: 24, offset: 0}} style={{boxShadow: '0 1px 3px rgba(26,26,26,.1)'}}>
                        <div style={{
                            backgroundImage: `url(${this.state.cover})`,
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundOrigin: 'padding-box',
                            backgroundClip: 'border-box',
                            backgroundAttachment: 'scroll',
                            height: '240px'
                        }}/>
                        <div style={{background: '#fff', display: 'flex', flexWrap: 'wrap'}}>
                            <div style={{height: '200px', width: '200px', marginTop: '-100px', padding: '20px'}}>
                                <Avatar shape='square' src={this.state.avatar} icon='user' style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '4px solid white',
                                    borderRadius: '10px',
                                    backgroundColor: 'white'
                                }}/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span style={{
                                        fontSize: '26px',
                                        lineHeight: '30px',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        marginRight: '6px'
                                    }}>{this.state.username}</span>
                                    {this.state.profession && <Tag color='#f50' style={{
                                        height: '22px',
                                        fontSize: '14px'
                                    }}>{this.state.profession}</Tag>}
                                </div>
                                <Paragraph>{this.state.bio}</Paragraph>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexGrow: '1',
                                flexDirection: 'row-reverse',
                                alignItems: 'center',
                                padding: '20px'
                            }}>
                                {this.state.follow ?
                                    <Button type='primary' onClick={this.unfollow} loading={this.state.loading}
                                            style={{width: '150px'}} block>Unfollow</Button> :
                                    <Button ghost type='primary' onClick={this.follow} loading={this.state.loading}
                                            style={{width: '150px'}} block>Follow</Button>}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{flex: '1 0', paddingTop: '15px', paddingBottom: '30px'}}>
                    <Col xxl={{span: 10, offset: 5}} xl={{span: 14, offset: 2}} md={{span: 14, offset: 1}}
                         xs={{span: 24, offset: 0}} style={{
                        background: '#fff',
                        padding: '0 20px',
                        marginBottom: '30px',
                        boxShadow: '0 1px 3px rgba(26,26,26,.1)'
                    }}>
                        <Tabs defaultActiveKey='1' size='large' style={{paddingBottom: '15px'}}>
                            <TabPane tab={<span><IconFont type='iconwenzhang'/>Articles</span>} key='1'>
                                <OtherUserArticleList visitUserId={this.props.match.params.id}/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col xxl={{span: 4, offset: 0}} xl={{span: 6, offset: 0}} md={{span: 8, offset: 0}}
                         xs={{span: 22, offset: 1}} style={{paddingLeft: '20px'}}/>
                </Row>
                <Row>
                    <Col xxl={{span: 16, offset: 4}} xl={{span: 20, offset: 2}} xs={{span: 22, offset: 1}}/>
                </Row>
            </Layout>
        )
    }
}

export default VisitOtherUserProfile
