import React, {Component} from 'react'
import {Layout, Avatar, Row, Col, Tabs, Icon, Button, Typography, Card, Statistic, Tag, message, Upload} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'


import MyArticleList from "../components/MyArticleList";
import FollowingList from "../components/FollowingList";
import FollowerList from "../components/FollowerList";
// import PropertyList from './PropertyList'

const TabPane = Tabs.TabPane;
const {Paragraph} = Typography;

function checkImageWH(file, width, height) {
    return new Promise(function (resolve, reject) {
        let filereader = new window.FileReader();
        filereader.onload = e => {
            let src = e.target.result;
            const image = new window.Image();
            image.onload = function () {
                if (width && this.width < width) {
                    message.error('The uploaded image must be larger than 1200p x 240p');
                    reject()
                } else if (height && this.height < height) {
                    message.error('The uploaded image must be larger than 1200p x 240p');
                    reject()
                } else {
                    resolve()
                }
            };
            image.onerror = reject;
            image.src = src
        };
        filereader.readAsDataURL(file)
    })
}

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('File size must smaller than 2MB!')
    }
    return isLt2M && checkImageWH(file, 1200, 240)
}

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_9cj9xgq951n.js'
});

class MyProfileContainer extends Component {
    state = {
        data: [],
        urlAvatar: '',
        username: '',
        bio: '',
        property: 0,
        profession: '',
        loading: false,
        cover: '',
        id: '',
        countFollowing: 0,
        countFollower: 0,
    };

    componentDidMount = async (v) => {
        await this.getProfileData();
        await this.getFollowingData();
        await this.getFollowerData();
    };

    async getProfileData() {
        await axios.get(
            'rest-auth/user/?format=json',
            {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
        ).then(response => {
                this.setState({
                    urlAvatar: response.data.profile.avatar,
                    username: response.data.username,
                    bio: response.data.profile.bio,
                    property: response.data.profile.property,
                    profession: response.data.profile.profession,
                    cover: response.data.profile.cover,
                    id: response.data.id
                })
            }
        ).catch(err => {
            console.log(err)
        });
    };

    async getFollowingData() {
        try {
            const response = await axios.get(
                'api/account/user/followers/?format=json&follower=' + this.state.id);
            this.setState({
                countFollowing: response.data.count,
            });
        } catch (error) {
            console.log(error)
        }
    }

    async getFollowerData() {
        try {
            const response = await axios.get(
                'api/account/user/followers/?format=json&user=' + this.state.id);
            this.setState({
                countFollower: response.data.count,
            });
        } catch (error) {
            console.log(error)
        }
    }

    CoverAvatarUrl = async (avatarURL) => {
        await axios.patch(
            'rest-auth/user/',
            {
                profile: {cover: avatarURL}
            },
            {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
        ).then(response => {
            if (response.status === 200) {
                message.success('Update successfully')
            }
        }).catch(err => {
            console.log(err.response.data)
        });
        this.setState({
            cover: avatarURL
        })

    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return
        }
        if (info.file.status === 'done') {
            this.setState({imageUrl: info.file.response.data.link, loading: false})
        }
        this.CoverAvatarUrl(info.file.response.data.link);
        // console.log(info.file.response.data.link)
    };

    customRequest = async (info) => {
        try {
            let formData = new window.FormData();
            formData.append('image', info.file);
            const response = await axios.post(
                info.action,
                formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Client-ID d0b3bf7724440e7',
                    }
                }
            );
            info.onSuccess(response.data)
        } catch (error) {
            console.log(error.response.data)
        }
    };


    render() {
        return (
            <Layout style={{minHeight: '100vh', backgroundColor: '#f7f7f7', paddingTop: '60px'}}>
                <Row style={{padding: '0 60px', paddingTop: '40px'}}>
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
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                marginTop: '20px',
                                marginRight: '20px'
                            }}>
                                <Upload
                                    name='avatar'
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                    customRequest={this.customRequest}
                                    action='https://api.imgur.com/3/image'
                                >
                                    <Button ghost style={{width: '150px', color: '#fff'}}>
                                        <Icon type='upload'/>Upload Cover
                                    </Button>
                                </Upload>
                            </div>
                        </div>
                        <div style={{
                            background: '#fff',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around'
                        }}>
                            <div style={{height: '200px', width: '200px', marginTop: '-100px', padding: '20px'}}>
                                <Avatar shape='square' src={this.state.urlAvatar} icon='user' style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '4px solid white',
                                    borderRadius: '10px',
                                    backgroundColor: 'white'
                                }}/>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap'
                            }}>
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
                                <Button type='primary' ghost style={{width: '150px'}}>
                                    <Link to='/profile/setting/'>Edit Profile</Link>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{flex: '1 0', padding: '20px 60px'}}>
                    <Col xxl={{span: 10, offset: 5}} xl={{span: 14, offset: 2}} md={{span: 14, offset: 1}}
                         xs={{span: 24, offset: 0}} style={{
                        background: '#fff',
                        padding: '0 20px',
                        marginBottom: '30px',
                        boxShadow: '0 1px 3px rgba(26,26,26,.1)'
                    }}>
                        <Tabs defaultActiveKey='1' size='large'>
                            <TabPane tab={<span><IconFont type='iconwenzhang'/>Articles</span>} key='1'>
                                <MyArticleList/>
                            </TabPane>
                            <TabPane tab={<span><IconFont type='iconfabu-'/>Following</span>} key='2'>
                                <FollowingList userId={this.state.id}/>
                            </TabPane>
                            <TabPane tab={<span><IconFont type='iconfensi'/>Follower</span>} key='3'>
                                <FollowerList id={this.state.id}/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col xxl={{span: 4, offset: 0}} xl={{span: 6, offset: 0}} md={{span: 8, offset: 0}}
                         xs={{span: 22, offset: 1}} style={{paddingLeft: '20px'}}>
                        <Card
                            title={
                                <div style={{color: '#646464', fontWeight: '600', fontSize: '15px'}}>
                                    积分
                                </div>
                            }
                            bordered={false}
                            style={{boxShadow: '0 1px 3px rgba(26,26,26,.1)', marginBottom: '20px'}}>
                            {/*<PropertyList property={this.state.property}/>*/}
                        </Card>
                        <Card
                            // title={
                            //     <div style={{color: '#646464', fontWeight: '600', fontSize: '15px'}}>
                            //         Achievement
                            //     </div>
                            // }
                            bordered={false}
                            style={{boxShadow: '0 1px 3px rgba(26,26,26,.1)'}}>
                            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                <Statistic title='Following' value={this.state.countFollowing}/>
                                <Statistic title='Follower' value={this.state.countFollower}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xxl={{span: 16, offset: 4}} xl={{span: 20, offset: 2}} xs={{span: 22, offset: 1}}/>
                </Row>
            </Layout>
        )
    }
}

export default MyProfileContainer
