import React, {Component} from "react";
import {List, Button, Icon, Input} from "antd";
import axios from "axios";
import Article from "./Article";


const count = 5;
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
        next: "",
        username: "",
        id: null,
    };

    componentDidMount = async v => {
        await this.getArticleData();
        await this.getUserData();
        this.setState({initLoading: false});
    };

    getUserData = async (v) => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/rest-auth/user/',
                {headers: {'Authorization': 'Token ' + window.localStorage.getItem('token')}}
            );
            this.setState(function (state) {
                return {username: response.data.username, id: response.data.id}
            })
        } catch (error) {
            console.log(error)
        }
    };

    getArticleData = async v => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/comment/articles/?format=json" +
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
                "http://127.0.0.1:8000/api/comment/articles/?format=json" +
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
                "http://127.0.0.1:8000/api/comment/articles/?format=json" +
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
        const {initLoading, loading, cache, data, next} = this.state;
        const loadMore =
            !initLoading && !loading && next ? (
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 12,
                        height: 32,
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
            <div
                style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 3px rgba(26,26,26,.1)",
                    borderRadius: "1px"
                }}
            >
                <Search
                    placeholder="Please input keywords"
                    onSearch={value => this.search(value)}
                    enterButton
                />
                {loading === false ?
                    <List
                        itemLayout="vertical"
                        dataSource={cache}
                        loadMore={loadMore}
                        loading={initLoading}
                        renderItem={item => (
                            <Article item={item} userId={this.state.id} key={'Article_item' + item.id}/>
                        )}/> :
                    null
                }

            </div>
        );
    }
}

export default ArticleList;
