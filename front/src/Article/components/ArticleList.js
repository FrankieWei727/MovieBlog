import React, {useEffect, useState} from "react";
import {List, Button, Icon, Input} from "antd";
import axios from "axios";
import Article from "./Article";

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1621723_xyv7nayrgmr.js"
});
const {Search} = Input;
let page = 1;
const pagesize = 5;

const ArticleList = () => {

    const [data, setData] = useState([]);
    const [cache, setCache] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [id, setId] = useState(null);
    const [count, setCount] = useState(0);

    async function getUserData() {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
            await axios.get('rest-auth/user/',
                {headers: {'Authorization': 'Token ' + token}}
            ).then(res => {
                setId(res.data.id);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    async function getArticleData() {
        page = 1;
        await axios.get(
            "api/comment/articles/?format=json", {
                params: {
                    page: page,
                    page_size: pagesize,
                }
            }
        ).then(res => {
            setCount(res.data.count);
            setData(res.data.results);
            setCache(res.data.results);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getArticleData().then();
        getUserData().then();
        setInitLoading(false);
    }, []);


    const onLoadMore = async () => {
        await setLoading(true);
        await setCache(data.concat([...new Array(pagesize)].map(() => (
            {loading: true, id: "", author: "",}))));

        page = page + 1;
        if (cache.length === count) {
            setLoading(false);
        }
        await axios.get(
            "api/comment/articles/?format=json", {
                params: {
                    page: page,
                    page_size: pagesize,
                }
            }
        ).then(res => {
            setData(data.concat(res.data.results));
            setCache(data.concat(res.data.results));
            setLoading(false);
            window.dispatchEvent(new window.Event("resize"));
        });
    };

    const onSearch = async value => {
        setInitLoading(true);
        page = 1;
        await axios.get(
            "api/comment/articles/?format=json", {
                params: {
                    page: page,
                    page_size: pagesize,
                    search: value,
                }
            }).then(res => {
            setData(res.data.results);
            setCache(res.data.results);
            setCount(res.data.count);
            setInitLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

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
                <Button onClick={onLoadMore}>
                    <IconFont type="icon-more1-copy-copy"/>
                    Load More
                </Button>
            </div>
        ) : null;

    return (
        <div>
            <Search
                placeholder="Please input keywords"
                onSearch={value => onSearch(value)}
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
};

export default ArticleList;
