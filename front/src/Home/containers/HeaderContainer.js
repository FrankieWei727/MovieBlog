import React from 'react'
import {Layout, Menu, Avatar, Divider, Button, Dropdown, Icon, Row, Col, Drawer, List} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import * as actions from "../../Store/actions/auth";
import {connect} from "react-redux";

const {Header} = Layout;

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
        };
    }

    state = {
        key: "",
        username: "",
        avatar: "",
        visible: false,
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.token !== null) {
            axios.get(
                'rest-auth/user/?format=json',
                {headers: {'Authorization': 'Token ' + nextProps.token}}
            ).then(res => {
                    this.setState({
                        username: res.data.username,
                        avatar: res.data.profile.avatar,
                    });
                }
            ).catch(err => {
                console.log(err)
            });
        }
    };

    onShowMenu = () => {
        this.setState({
            visible: true
        })
    };
    onClose = () => {
        this.setState({
            visible: false
        });
    };
    onLogin = () => {
        this.setState({
            visible: false
        });
    };
    onSignup = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const {username} = this.state;
        const DropdownList = (
            <Menu className="drop-list">
                <Menu.Item key="4">
                    <Link to={'/profile'}>
                        <Icon type="user" style={{paddingRight: '3px'}}/>
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={'/profile/setting'}>
                        <Icon type="setting" style={{paddingRight: '3px'}}/>
                        Setting
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to={'/logout'} onClick={this.props.logout}>
                        <Icon type="logout" style={{paddingRight: '3px'}}/>
                        Logout
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <Header style={{
                    padding: "0 0",
                    position: 'fixed',
                    zIndex: 100,
                    width: '100%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                    borderColor: 'transparent transparent rgba(26,26,26,.1) transparent',
                }}>
                    <Row>
                        <Col xxl={{span: 17, offset: 3}}
                             xl={{span: 19, offset: 2}}
                             lg={{span: 19, offset: 2}}
                             md={{span: 21, offset: 1}}
                             sm={{span: 21, offset: 1}}
                             xs={{span: 22, offset: 0}}>
                            <div style={{float: 'left'}}>
                                <img src='https://i.imgur.com/pRMV4vy.png' style={{width: "120px"}}/>
                            </div>
                            <div>
                                <Menu
                                    style={{padding: "0 10px"}}
                                    className="header-menu"
                                    theme="light"
                                    mode="horizontal"
                                >
                                    <Menu.Item className="header-menu-item" key="1">Article
                                        <Link to={'/article'}/></Menu.Item>
                                    <Menu.Item className="header-menu-item" key="2">Movie
                                        <Link to={'/movie'}/></Menu.Item>
                                    <Menu.Item className="header-menu-item" key="3">Event
                                        <Link to={'/event'}/></Menu.Item>
                                    <div style={{float: 'right'}}>
                                        {
                                            this.props.isAuthenticated ?
                                                <Dropdown overlay={DropdownList} placement="bottomCenter">
                                                    <div>
                                                        <Avatar shape="square" src={this.state.avatar}/>
                                                    </div>
                                                </Dropdown>
                                                :
                                                (window.innerWidth >= 500 ?
                                                        <div>
                                                            <Button type={"link"}>
                                                                <Link to={'/login'}>Log in</Link>
                                                            </Button>
                                                            <Divider type="vertical"/>
                                                            <Button type={"link"} style={{marginLeft: '0.5em'}}>
                                                                <Link to={'/signup'}>Sign Up</Link>
                                                            </Button>
                                                        </div>
                                                        :
                                                        <Button type="link" onClick={this.onShowMenu}>
                                                            <Icon type="bars"/>
                                                        </Button>
                                                )
                                        }
                                    </div>
                                </Menu>
                            </div>
                        </Col>
                    </Row>
                    <Drawer
                        height={150}
                        destroyonclos="true"
                        placement="bottom"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <List>
                            <List.Item key="login" onClick={this.onLogin}>
                                <Link to={'/login'}>Login</Link></List.Item>
                            <List.Item key="register" onClick={this.onSignup}>
                                <Link to={'signup'}>Register</Link></List.Item>
                        </List>
                    </Drawer>
                </Header>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())

    }
};

export default connect(null, mapDispatchToProps)(HomeHeader)