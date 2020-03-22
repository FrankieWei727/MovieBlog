import React, {Component} from "react";
import {List, Button, Icon, Input} from "antd";
import axios from "axios";
import Article from "./Article";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1621723_xyv7nayrgmr.js"
});
const {Search} = Input;

class ArticleList extends Component {
    page = 1;
    state = {
        data: [],
        cache: [],
        loading: false,
        initLoading: true,
        username: "",
        id: null,
        pagesize: 5,
        count: 0,
    };

    componentDidMount = async v => {
        await this.getArticleData();
        await this.getUserData();
        this.setState({initLoading: false});
    };

    async getUserData() {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            try {
                const response = await axios.get(
                    'rest-auth/user/',
                    {headers: {'Authorization': 'Token ' + token}}
                );
                this.setState(function (state) {
                    return {
                        username: response.data.username,
                        id: response.data.id
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    };

    async getArticleData() {
        try {
            const response = await axios.get(
                "api/comment/articles/?format=json" +
                "&page=" + this.page + "&page_size=" + this.state.pagesize
            );
            this.setState({
                count: response.data.count,
                data: response.data.results,
                cache: response.data.results,
            });
        } catch (error) {
            console.log(error);
        }
    };

    onLoadMore = async () => {
        await this.setState({
            loading: true,
            cache: this.state.data.concat(
                [...new Array(this.state.pagesize)].map(() => (
                    {loading: true, id: "", author: "",}))
            )
        });

        this.page = this.page + 1;
        if (this.state.cache.length === this.state.count) {
            this.setState({
                loading: false,

            })
        }
        await axios.get(
            "api/comment/articles/?format=json" +
            "&page=" + this.page +
            "&page_size=" + this.state.pagesize
        ).then(res => {
            const temp = this.state.data.concat(res.data.results);
            this.setState(
                {
                    data: temp,
                    cache: temp,
                    loading: false,
                }, () => {
                    window.dispatchEvent(new window.Event("resize"));
                });
        });
    };

    search = async value => {
        this.setState({
            initLoading: true
        });
        try {
            this.page = 1;
            const response = await axios.get(
                "api/comment/articles/?format=json" +
                "&page=" + this.page +
                "&page_size=" + this.state.pagesize +
                "&search=" + value
            );
            this.setState({
                data: response.data.results,
                count: response.data.count,
                cache: response.data.results,
                initLoading: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {initLoading, loading, cache, data, id, count} = this.state;
        const loadMore =
            !initLoading && !loading && (data.length !== count) ? (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 12,
                        height: 50,
                        lineHeight: "32px"
                    }}
                >
                    <Button onClick={this.onLoadMore}>
                        <IconFont type="icon-more1-copy-copy"/>
                        Load More
                    </Button>
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
                <List
                    itemLayout="vertical"
                    dataSource={cache}
                    loadMore={loadMore}
                    loading={initLoading}
                    renderItem={item => (
                        <Article item={item} userId={id} key={'Article_item' + item.id}/>
                    )}/>

            </div>
        );
    }
}

export default ArticleList;
