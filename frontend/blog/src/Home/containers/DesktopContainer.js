import {Button, Container, Menu, Responsive, Segment, Visibility} from "semantic-ui-react";
import HomepageHeading from "../components/HomeHeader";
import PropTypes from "prop-types";
import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom";
import * as actions from "../../Store/actions/auth";
import {connect} from 'react-redux';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {

    state = {};
    handleItemClick = (e, {name}) => {

        this.setState({activeItem: name});
        this.props.history.push(`/${name}`);

    }

    hideFixedMenu = () => this.setState({fixed: false})
    showFixedMenu = () => this.setState({fixed: true})


    render() {
        const {children} = this.props;
        const {fixed} = this.state;
        const {activeItem} = this.state;

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{minHeight: 200, padding: '1em 0em'}}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                                    Home
                                </Menu.Item>
                                <Menu.Item name='movie' active={activeItem === 'movie'} onClick={this.handleItemClick}>
                                    Movie
                                </Menu.Item>
                                <Menu.Item name='review' active={activeItem === 'review'} onClick={this.handleItemClick}>
                                    Blog</Menu.Item>
                                <Menu.Item name='event' active={activeItem === 'event'} onClick={this.handleItemClick}>
                                    Event
                                </Menu.Item>
                                {
                                    this.props.isAuthenticated ?
                                        <Menu.Item name='profile' active={activeItem === 'profile'}
                                                   onClick={this.handleItemClick}>
                                            Profile
                                        </Menu.Item>
                                        :
                                        <div> </div>

                                }
                                <Menu.Item position='right'>
                                    {
                                        this.props.isAuthenticated ?
                                            <Button inverted={!fixed} onClick={this.props.logout}>
                                                Log out
                                            </Button>
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
                        <HomepageHeading/>
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(DesktopContainer));