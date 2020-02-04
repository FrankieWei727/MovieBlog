import React, {Component} from 'react'
import {Icon} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_d874tqmi7pk.js'
});


class MoviePromotionList extends Component {
    state = {
        current: '',
        switch: false
    };

    componentDidMount = async (v) => {
        await this.getUserProfile()
    };

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    };

    async getUserProfile() {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            await axios.get(
                'rest-auth/user/',
                {headers: {'Authorization': 'Token ' + token}}
            ).then(response => {
                    this.setState({
                        switch: (response.data.profile.permission === 'reviewed')
                    })
                }
            ).catch(err => {
                console.log(err)
            });
        }
    };

    render() {
        return (
            <div style={{
                padding: '20px 20px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 1px 3px rgba(26,26,26,.1)',
                marginBottom: '10px'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Link
                            to={this.props.token ? (this.state.switch ? '/movie_upload' : '/permission/setting') : 'login'}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'right'
                            }}>
                                <IconFont type='iconfabu1' style={{fontSize: '36px'}}/>
                            </div>
                        </Link>
                    </div>
                    {/*<Link to={this.state.switch ? '/book_editor_page' : '/settings/account'}>*/}
                    {/*    <div style={{*/}
                    {/*        display: 'flex',*/}
                    {/*        flexDirection: 'column',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'center'*/}
                    {/*    }}>*/}
                    {/*        <IconFont type='iconshuben' style={{fontSize: '36px'}}/>*/}
                    {/*    </div>*/}
                    {/*    Book*/}
                    {/*</Link>*/}
                    {/*<Link to={this.state.switch ? '/movie_upload' : '/permission/setting'}>*/}
                    {/*    <div style={{*/}
                    {/*        display: 'flex',*/}
                    {/*        flexDirection: 'column',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'left'*/}
                    {/*    }}>*/}
                    {/*        <IconFont type='icondianying' style={{fontSize: '36px'}}/>*/}
                    {/*        Movie*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
};

export default connect(mapStateToProps, null)(MoviePromotionList)
