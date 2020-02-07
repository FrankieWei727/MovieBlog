import React from "react";
import {Button, Col, Icon, List, message} from "antd";
import axios from "axios";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_m6ue80tfyy.js'
});

class MovieLike extends React.Component {

    state = {
        like: false,
        loading: false,
    };

    componentDidMount = async (v) => {
        await this.isLike();
    };

    async isLike() {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            const response = await axios.post(
                'api/movie/movie/fans/' + this.props.movieId + '/is_like/?format=json',
                {},
                {headers: {'Authorization': 'Token ' + token}}
            );
            this.setState({
                like: (response.data.code === '1')
            })
        }
    };

    like = async (e) => {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            this.setState({loading: true});
            await axios.post(
                'api/movie/movie/fans/' + this.props.movieId + '/like/?format=json',
                {},
                {headers: {'Authorization': 'Token ' + token}}
            );
            setTimeout(() => {
                this.setState({
                    like: true,
                    loading: false
                })
            }, 300);
            message.success('Like successfully')
        } else {
            message.warning('Please login!')
        }
    };

    unlike = async (e) => {
        this.setState({loading: true});
        await axios.post(
            'api/movie/movie/fans/' + this.props.movieId + '/unlike/?format=json',
            {},
            {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
        );

        setTimeout(() => {
            this.setState({
                like: false,
                loading: false
            })
        }, 300);
        message.success('Unlike Successfully!')
    };

    render() {
        return (
            <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 0}}
                 xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                <div style={{
                    marginTop: '20px',
                    marginBottom: '40px'
                }}>
                    <h3 style={{marginRight: '20px', fontWeight: 'bold'}}>Actions</h3>
                    <div>
                        <List
                            itemLayout="vertical"
                            size="small"
                            bordered={false}
                            split={false}>
                            <List.Item>
                                {this.state.like ?
                                    <Button onClick={this.unlike} type='link' size="large"
                                            loading={this.state.loading}>
                                        <IconFont type='icondianzan'/>
                                    </Button> :
                                    <Button onClick={this.like} type='link' size="large"
                                            loading={this.state.loading}>
                                        <IconFont type='iconfabulous'/>
                                    </Button>
                                }
                                {/*<Button onClick={this.like} type='link' size="large"*/}
                                {/*        loading={this.state.loading}>*/}
                                {/*    <IconFont type='iconfabulous'/>*/}
                                {/*</Button>*/}
                            </List.Item>
                        </List>
                    </div>
                </div>
            </Col>
        )
    }
}

export default MovieLike;