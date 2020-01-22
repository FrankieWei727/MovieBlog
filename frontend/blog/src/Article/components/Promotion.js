import React, {Component} from 'react'
import {Icon, Typography} from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1242637_ng8zkbwomt.js'
})

const {Title} = Typography;

class PromotionList extends Component {
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

    getUserProfile = async (v) => {

        await axios.get(
            'http://127.0.0.1:8000/rest-auth/user/',
            {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
        ).then(response => {
                this.setState({
                    switch: (response.data.profile.media_editor_auth === '审核通过')
                })
            }
        ).catch(err => {
            console.log(err)
        });
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
                <Title level={4} style={{marginBottom: '30px'}}>Promotion</Title>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={(window.localStorage.getItem('token') !== null) ? '/create_article' : '/login'}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconFont type='icon-article' style={{fontSize: '36px'}}/>
                            <div>Write Article</div>
                        </div>
                    </Link>
                    <Link to={this.state.switch ? '/book_editor_page' : '/settings/account'}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconFont type='icon-book' style={{fontSize: '36px'}}/>
                            <div>推书籍</div>
                        </div>
                    </Link>
                    <Link to={this.state.switch ? '/movie_editor_page' : '/settings/account'}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <IconFont type='icon-movie' style={{fontSize: '36px'}}/>
                            <div>推影视</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default PromotionList
