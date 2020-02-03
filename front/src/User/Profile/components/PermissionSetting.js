import React, {Component} from 'react'
import {Layout, Col, Row, Icon, Typography, Tabs, Divider} from 'antd'
import axios from 'axios'
import {Link} from 'react-router-dom'


import MovieEditPermission from "./MovieEditPermission";

const {Title} = Typography;
const {TabPane} = Tabs;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_xc714kf5q6.js'
});
class PermissionSetting extends Component {
    componentDidMount() {
        this.getProfileData()
    }

    state = {
        data: [],
        collapsed: false,
        bio: '',
        username: '',
        email: ''
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed})
    };

    getProfileData = async (v) => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/rest-auth/user/',
                {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
            );
            this.data = response.data.results;
            this.setState(function (state) {
                return {
                    urlAvatar: response.data.profile.avatar,
                    bio: response.data.profile.bio,
                    username: response.data.username,
                    email: response.data.email
                }
            })
        } catch (error) {
            console.log(error)
        }
    };

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh', backgroundColor: '#fff'}}>
                <div style={{flex: '1 0'}}>
                    <Row style={{flex: '1 0', padding: '40px 60px'}}>
                        <Col xxl={{span: 3, offset: 5}} xl={{span: 4, offset: 2}} md={{span: 5, offset: 1}}
                             xs={{span: 22, offset: 1}} style={{marginBottom: '20px'}}>
                            <nav style={{border: '1px solid #d1d5da', borderRadius: '3px'}}>
                                <div style={{
                                    backgroundColor: '#f3f5f8',
                                    color: '#586069',
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    borderBottom: '1px solid #e1e4e8',
                                    fontWeight: '800'
                                }}>
                                    Setting
                                </div>
                                <Link to='/profile/setting'>
                                    <div style={{
                                        padding: '8px 10px',
                                        display: 'block',
                                        borderBottom: '1px solid #e1e4e8',
                                        color: '#0366d6'
                                    }}>
                                        <Icon type='user' style={{paddingRight: '6px'}}/>Account Setting
                                    </div>
                                </Link>
                                <Link to='/permission/setting'>
                                    <div style={{
                                        padding: '8px 10px',
                                        display: 'block',
                                        color: '#24292e',
                                        fontWeight: '600',
                                        cursor: 'default',
                                        borderLeft: '3px solid #e36209'
                                    }}>
                                        <Icon type='setting' style={{paddingRight: '6px'}}/>Permission Setting
                                    </div>
                                </Link>
                            </nav>
                        </Col>
                        <Col xxl={{span: 11, offset: 0}} xl={{span: 16, offset: 0}} md={{span: 16, offset: 0}}
                             xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                            <div style={{padding: '0 10px '}}>
                                <Row>
                                    <Col xl={{span: 24, offset: 0}} xs={{span: 22, offset: 1}}>
                                        <div style={{
                                            fontSize: '20px',
                                            borderBottom: '1px solid #e1e4e8',
                                            paddingBottom: '8px',
                                            fontWeight: '600',
                                            color: '#24292e'
                                        }}>
                                            Permission Setting
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '20px'}}>
                                    <Col xl={{span: 24, offset: 0}} xs={{span: 22, offset: 1}}>
                                        <Tabs defaultActiveKey='1'>
                                            <TabPane
                                                tab={
                                                    <span>
                                                        <IconFont type='iconguanli'/>Film Editors
                                                    </span>
                                                }
                                                key='1'
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'baseline'
                                                }}>
                                                    <Title style={{padding: '24px 0'}} level={4}>Film resource
                                                        editor</Title>
                                                    <Divider type='vertical'/>
                                                    <Link to='/editor_guidance'>Note to editors</Link>
                                                </div>
                                                <MovieEditPermission/>
                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span>
                                                         <Icon type='android'/>In coming
                                                    </span>
                                                }
                                                key='2'
                                            >
                                                Tab 2
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}

export default PermissionSetting
