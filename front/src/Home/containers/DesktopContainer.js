import {Button, Container, Menu, Responsive, Visibility, Image, Popup, Input} from "semantic-ui-react";
import PropTypes from "prop-types";
import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom";
import * as actions from "../../Store/actions/auth";
import {connect} from 'react-redux';
import axios from "axios";

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

class DesktopContainer extends Component {

    state = {
        username: "",
        avatar: "",
        name: "",
    };
    handleItemClick = (e, {name}) => {

        this.setState({
            activeItem: name,
            name: name,
        });
        this.props.history.push(`/${name}`);

    };

    componentDidMount = async (v) => {
        await this.getUserData()
    };

    getUserData = async (v) => {
        await axios.get(
            'http://127.0.0.1:8000/rest-auth/user/' + '?format=json',
            {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
        ).then(response => {
                this.setState({
                    username: response.data.username,
                    avatar: response.data.profile.avatar,
                })
            }
        ).catch(err => {
            console.log(err)
        });
    };

    hideFixedMenu = () => this.setState({fixed: false});
    showFixedMenu = () => this.setState({fixed: true});


    render() {
        const {children} = this.props;
        const {fixed} = this.state;
        const {activeItem} = this.state;
        return (

            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <Menu
                        text={fixed}
                        fixed={fixed ? 'top' : null}
                        pointing
                        secondary
                        style={{backgroundColor: '#FFFFFF'}}
                        size='large'>
                        <Container verticalAlign="bottom">
                            <Menu.Item>
                                <Image src='https://i.imgur.com/pRMV4vy.png' size='small'/>
                            </Menu.Item>
                            <Menu.Item name='article' active={activeItem === 'article'}
                                       onClick={this.handleItemClick}>
                                Blog</Menu.Item>
                            <Menu.Item name='movie' active={activeItem === 'movie'} onClick={this.handleItemClick}>
                                Movie
                            </Menu.Item>
                            <Menu.Item name='event' active={activeItem === 'event'} onClick={this.handleItemClick}>
                                Event
                            </Menu.Item>
                            <Menu.Item position='right'>
                                {
                                    this.props.isAuthenticated ?
                                        <Popup
                                            position="bottom center"
                                            style={{padding: "0px 0px"}}
                                            hideOnScroll
                                            on="click"
                                            content={
                                                <Menu vertical borderless fixed style={{maxWidth: "100px"}}>
                                                    <Menu.Item
                                                        name="profile"
                                                        href={'/profile'}
                                                    />
                                                    <Menu.Item
                                                        name="settings"
                                                        href={'/profile/setting'}
                                                    />
                                                    <Menu.Item
                                                        name="logout"
                                                        href={'/logout'}
                                                        onClick={this.props.logout}
                                                    />
                                                </Menu>
                                            }
                                            trigger={<Image src={this.state.avatar} avatar/>}
                                        />
                                        :
                                        <div>
                                            <Button inverted={!fixed}>
                                                <Link to={'/login'}>Log in</Link>
                                            </Button>
                                            <Button inverted={!fixed} style={{marginLeft: '0.5em'}}>
                                                <Link to={'/signup'}>Sign Up</Link>
                                            </Button>
                                        </div>
                                }
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Visibility>
                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())

    }
};

export default withRouter(connect(null, mapDispatchToProps)(DesktopContainer));