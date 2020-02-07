import React from "react";
import {Avatar, Col, List, Spin, message} from "antd";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class MovieFansList extends React.Component {

    state = {
        page: 1,
        fans: [],
        count: 0,
        pagesize: 5,
        loading: false,
        hasMore: true,

    };

    componentDidMount = async (v) => {
        await axios.get('api/movie/movie/fans/?movie=' + this.props.movieId +
            "&page=" + this.state.page + "&page_size=" + this.state.pagesize)
            .then(res => {
                this.setState({
                    fans: res.data.results,
                    count: res.data.count
                })
            })
    };

    handleInfiniteOnLoad = async page => {
        let {fans} = this.state;
        this.setState({
            loading: true,
        });
        if (fans.length === this.state.count) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        await axios.get('api/movie/movie/fans/?movie=' + this.props.movieId +
            "&page=" + page + "&page_size=" + this.state.pagesize)
            .then(res => {
                let temp = fans;
                let i = (page - 1) * this.state.pagesize;
                for (let index = 0; index < res.data.results.length; index++) {
                    temp[i] = res.data.results[index];
                    i++;
                }
                this.setState({
                    fans: temp,
                    loading: false,
                });
            }).catch(error => {
                console.log(error);
            });
    };


    render() {
        const {fans} = this.state;
        return (

            <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 0}}
                 xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                <div style={{
                    marginTop: '20px',
                    marginBottom: '40px'
                }}>
                    <h3 style={{marginRight: '20px', fontWeight: 'bold'}}>Who likes</h3>
                    <div className="infinite-container">
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={this.state.page}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                            useWindow={false}
                        >
                            <List
                                dataSource={fans}
                                itemLayout="vertical"
                                size="small"
                                bordered={false}
                                renderItem={item => (
                                    <List.Item>
                                        <Avatar src={item.fans.profile.avatar}
                                                alt={'fans'}></Avatar>
                                        <p style={{
                                            display: 'inline',
                                            paddingLeft: '5px',
                                            fontWeight: 'bold',
                                            color: '#5C5C5C'
                                        }}>{item.fans.username}</p>
                                    </List.Item>
                                )}/>
                            {this.state.loading && this.state.hasMore && (
                                <div className="loading-container">
                                    <Spin/>
                                </div>
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </Col>
        )
    }
}

export default MovieFansList