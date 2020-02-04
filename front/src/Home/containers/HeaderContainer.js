import React from 'react'
import {Layout, Menu, Popover, Avatar, Divider, Button, Col} from 'antd';
import {Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import axios from "axios";
import Row from "antd/es/grid/row";
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
                'http://127.0.0.1:8000/rest-auth/user/' + '?format=json',
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
        return (
            <Header style={{
                position: 'fixed',
                zIndex: 1, width: '100%',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                borderColor: 'transparent transparent rgba(26,26,26,.1) transparent',
                borderRadius: '5px'
            }}>
                <div style={{padding: '0 130px'}}>
                    <div style={{float: 'left', width: '120px', margin: '16px 24px 16px 0'}}>
                        <Image src='https://i.imgur.com/pRMV4vy.png' size='small'/>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '62px', borderColor: 'transparent',}}
                    >
                        <Menu.Item key="1">Article
                            <Link to={'/article'}/></Menu.Item>
                        <Menu.Item key="2">Movie
                            <Link to={'/movie'}/></Menu.Item>
                        <Menu.Item key="3">Event
                            <Link to={'/event'}/></Menu.Item>
                        <div style={{float: 'right', paddingRight: '10px'}}>
                            {
                                this.props.isAuthenticated ?
                                    <Popover
                                        content={
                                            <div>
                                                <Row>
                                                    <Col style={{paddingBottom: '5px'}}>
                                                        <Link to={'/profile'}>
                                                            <p>Profile</p>
                                                        </Link>
                                                    </Col>
                                                    <Col style={{paddingBottom: '5px'}}>
                                                        <Link to={'/profile/setting'}>
                                                            <p>Setting</p>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Link to={'/logout'} onClick={this.props.logout}>
                                                            <p>Logout</p>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        }
                                        title={this.state.username}
                                        trigger="click">
                                        <Avatar shape="square" src={this.state.avatar}/>
                                    </Popover>
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
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())

    }
};

export default connect(null, mapDispatchToProps)(HomeHeader)