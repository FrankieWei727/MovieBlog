import React from 'react'
import {Layout, Menu, Avatar, Divider, Button, Dropdown, Icon, Row, Col} from 'antd';
import {Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import axios from "axios";
import * as actions from "../../Store/actions/auth";
import {connect} from "react-redux";

const {Header} = Layout;

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };
    }

    state = {
        key: "",
        username: "",
        avatar: "",
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.token !== null) {
            axios.get(
                'rest-auth/user/?format=json',
                {headers: {'Authorization': 'Token ' + nextProps.token}}
            ).then(response => {
                    this.setState({
                        username: response.data.username,
                        avatar: response.data.profile.avatar,
                    });
                }
            ).catch(err => {
                console.log(err)
            });
        }
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
                {
                    username !== 'admin' ?
                        <Header style={{
                            padding : "0 0",
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
                                    <div style={{float: 'left', padding: "15px 0",width:"140px"}}>
                                        <Image src='https://i.imgur.com/pRMV4vy.png' size='small'/>
                                    </div>
                                    <div>
                                        <Menu
                                            className="header-menu"
                                            theme="light"
                                            mode="horizontal"
                                        >
                                            <Menu.Item key="1">Article<Link to={'/article'}/></Menu.Item>
                                            <Menu.Item key="2">Movie<Link to={'/movie'}/></Menu.Item>
                                            <Menu.Item key="3">Event<Link to={'/event'}/></Menu.Item>
                                            <div style={{float: 'right'}}>
                                                {
                                                    this.props.isAuthenticated ?
                                                        <Dropdown overlay={DropdownList} placement="bottomCenter">
                                                            <div>
                                                                <Avatar shape="square" src={this.state.avatar}/>
                                                            </div>
                                                        </Dropdown>
                                                        :
                                                        <div>
                                                            <Button type={"link"}>
                                                                <Link to={'/login'}>Log in</Link>
                                                            </Button>
                                                            <Divider type="vertical"/>
                                                            <Button type={"link"} style={{marginLeft: '0.5em'}}>
                                                                <Link to={'/signup'}>Sign Up</Link>
                                                            </Button>
                                                        </div>
                                                }
                                            </div>
                                        </Menu>
                                    </div>
                                </Col>
                            </Row>
                        </Header>
                        :
                        null
                }
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