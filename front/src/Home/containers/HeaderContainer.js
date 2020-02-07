import React from 'react'
import {Layout, Menu, Avatar, Divider, Button, Dropdown, Icon} from 'antd';
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
        key: null,
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
                            position: 'fixed',
                            zIndex: 100, width: '100%',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                            borderColor: 'transparent transparent rgba(26,26,26,.1) transparent',
                        }}>
                            <div style={{padding: '0 9%', backgroundColor: '#ffffff',}}>
                                <div style={{float: 'left', width: '9%', margin: '2% 0',}}>
                                    <Image src='https://i.imgur.com/pRMV4vy.png' size='small'/>
                                </div>
                                <Menu
                                    theme="light"
                                    mode="horizontal"
                                    style={{lineHeight: '62px', borderColor: 'transparent',}}
                                >
                                    <Menu.Item key="1">Article<Link to={'/article'}/></Menu.Item>
                                    <Menu.Item key="2">Movie<Link to={'/movie'}/></Menu.Item>
                                    <Menu.Item key="3">Event<Link to={'/event'}/></Menu.Item>
                                    <div style={{float: 'right', paddingRight: '1%'}}>
                                        {
                                            this.props.isAuthenticated ?
                                                <div>
                                                    <Dropdown overlay={DropdownList} placement="bottomCenter">
                                                        <div>
                                                            <Avatar shape="square" src={this.state.avatar}/>
                                                        </div>
                                                    </Dropdown>
                                                </div>
                                                :
                                                <div>
                                                    <div>
                                                        <Button type={"link"}>
                                                            <Link to={'/login'}>Log in</Link>
                                                        </Button>
                                                        <Divider type="vertical"/>
                                                        <Button type={"link"} style={{marginLeft: '0.5em'}}>
                                                            <Link to={'/signup'}>Sign Up</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </Menu>
                            </div>
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