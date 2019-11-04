import {Container, Icon, Menu, Responsive, Segment, Sidebar} from "semantic-ui-react";
import HomepageHeading from "../components/HomeHeader";
import PropTypes from "prop-types";
import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import * as actions from "../../Store/actions/auth";
import {connect} from "react-redux";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class MobileContainer extends Component {
    state = {}
    handleItemClick = (e, {name}) => {

        this.setState({activeItem: name});
        this.props.history.push(`/${name}`);

    }

    handleSidebarHide = () => this.setState({sidebarOpened: false})
    handleToggle = () => this.setState({sidebarOpened: true})

    render() {
        const {children} = this.props
        const {sidebarOpened} = this.state
        const {activeItem} = this.state

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item name={'home'}
                               active={activeItem === 'home'}
                               onClick={this.handleItemClick}>Home
                    </Menu.Item>
                    <Menu.Item name={'movie'}
                               active={activeItem === 'movie'}
                               onClick={this.handleItemClick}>Movie
                    </Menu.Item>
                    <Menu.Item as='a'>Blog</Menu.Item>
                    <Menu.Item name={'event'}
                               active={activeItem === 'event'}
                               onClick={this.handleItemClick}>Event
                    </Menu.Item>
                    {
                        this.props.isAuthenticated ?
                            <Menu.Item onClick={this.props.logout}>Log Out
                            </Menu.Item>
                            :
                            <div>
                                <Menu.Item name={'login'}
                                           active={activeItem === 'login'}
                                           onClick={this.handleItemClick}>Log in
                                </Menu.Item>
                                <Menu.Item name={'signup'}
                                           active={activeItem === 'signup'}
                                           onClick={this.handleItemClick}>Sign Up
                                </Menu.Item>

                            </div>

                    }

                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{minHeight: 350, padding: '1em 0em'}}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar'/>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile/>
                    </Segment>
                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}
export default withRouter(connect(null, mapDispatchToProps)(MobileContainer));