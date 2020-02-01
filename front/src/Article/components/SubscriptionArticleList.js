import React, {Component} from "react";
import {List, Button, Icon, Input} from "antd";
import axios from "axios";
import Article from "./Article";

const count = 5;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1621723_xyv7nayrgmr.js"
});
const {Search} = Input;
const token = window.localStorage.getItem('token');

class SubscriptionArticleList extends Component {
    page = 1;
    state = {
        data: [],
        cache: [],
        loading: false,
        initLoading: true,
        next: "",
        username: "",
        id: null,
        ids: "",
    };

    componentDidMount = async v => {
        await this.getUserData();
        await this.getFollowingData();
        await this.getArticleData();
        this.setState({initLoading: false});
    };

    async getUserData() {
        if (token !== null) {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/rest-auth/user/',
                    {headers: {'Authorization': 'Token ' + token}}
                );
                this.setState(function (state) {
                    return {
                        username: response.data.username,
                        id: response.data.id
                    };
                });
            } catch (error) {
                console.log(error)
            }
        }
    };

    async getFollowingData() {
        if (token !== null) {
            await axios.get(
                'http://127.0.0.1:8000/api/account/user/followers/?format=json&follower=' + this.state.id)
                .then(res => {
                        // get following list
                        const temp = [];
                        for (let index = 0; index < res.data.count; index++) {
                            temp.push({user: {id: index}});
                            temp[index] = res.data.results[index]
                        }
                        let temp_id = [];
                        for (let index = 0; index < temp.length; index++) {
                            temp_id[index] = temp[index].user.id;
                        }
                        this.setState({
                            ids: temp_id.join(',')
                        });
                    }
                ).catch(err => {
                    console.log(err)
                });
        }
    };

    getArticleData = async v => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/comment/following_articles/?id=" + this.state.ids +
                "&page=" +
                this.page +
                "&page_size=" +
                count
            );
            this.setState({
                data: response.data.results,
                cache: response.data.results,
                next: response.data.next
            });
        } catch (error) {
            console.log(error);
        }
    };

    onLoadMore = async v => {
        await this.setState({
            loading: true,
            cache: this.state.data.concat(
                [...new Array(count)].map(() => ({loading: true, name: {}}))
            )
        });
        try {
            this.page = this.page + 1;
            const response = await axios.get(
                "http://127.0.0.1:8000/api/comment/following_articles/?id=" + this.state.ids +
                "&page=" +
                this.page +
                "&page_size=" +
                count
            );
            this.setState({
                next: response.data.next
            });
            const temp1 = this.state.data;
            if (response.status === 200) {
                const temp = this.state.data.concat(response.data.results);
                this.setState({data: temp, cache: temp, loading: false}, () => {
                    window.dispatchEvent(new window.Event("resize"));
                });
            } else {
                this.setState({
                    cache: temp1
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    search = async value => {
        this.setState({
            initLoading: true
        });
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/comment/following_articles/?id=" + this.state.ids +
                "&page=" +
                this.page +
                "&page_size=" +
                count +
                "&search=" +
                value
            );
            this.setState({
                data: response.data.results,
                cache: response.data.results,
                initLoading: false,
                next: response.data.next
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {initLoading, loading, cache, data, next, id} = this.state;
        const loadMore =
            !initLoading && !loading && next ? (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 12,
                        height: 50,
                        lineHeight: "32px"
                    }}
                >
                    {data.length > 0 && (
                        <Button onClick={this.onLoadMore}>
                            <IconFont type="icon-more1-copy-copy"/>
                            Load More
                        </Button>
                    )}
                </div>
            ) : null;

        return (
            <div>
                <Search
                    placeholder="Please input keywords"
                    onSearch={value => this.search(value)}
                    enterButton
                    style={{padding: '0 20px', paddingTop: '10px'}}
                />
                {loading === false ?
                    <List
                        itemLayout="vertical"
                        dataSource={cache}
                        loadMore={loadMore}
                        loading={initLoading}
                        renderItem={item => (
                            <Article item={item} userId={id} key={'Following_Article_item' + item.id}/>
                        )}/> :
                    null
                }
            </div>
        );
    }
}

export default SubscriptionArticleList;
