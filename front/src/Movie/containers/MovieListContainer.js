import React, {useEffect, useState} from 'react';
import axios from 'axios';
import qs from 'qs'
import {
    Layout,
    Row,
    Col,
    Typography,
    BackTop,
    Input,
} from "antd";
import MovieItemList from "../components/MoiveList";
import Tags from "../components/Tags";

const pagesize = 10;
const {Title} = Typography;
const {Search} = Input;
const tips = ["All", "Search Result"];

let page = 1;
const MovieList = () => {

    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(0);
    const [tip, setTip] = useState(tips[0]);
    const [search, setSearch] = useState(null);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);


    function getTagsData() {
        axios.get("api/movie/categories_group/?format=json")
            .then(res => {
                setTags(res.data);
            }).catch(err => {
            console.log(err)
        });
    }

    function getData(nextSelectedTags, value, nextSelectedCountry) {
        let params = {};
        if (nextSelectedTags !== null) {
            params = {
                page: page,
                page_size: pagesize,
                title: value,
                categories: nextSelectedTags,
                countries: nextSelectedCountry,
            }
        } else {
            params = {
                page: page,
                page_size: pagesize,
                title: value,
                countries: nextSelectedCountry,
            }
        }
        axios.get(
            "api/movie/movies/?format=json", {
                params,
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                }
            }).then(res => {
            setMovies(res.data.results);
            setCount(res.data.count);
        }).catch(err => {
            console.log(err)
        });
    }

    useEffect(() => {
        getData();
        getTagsData();
        setLoading(false);

    }, []);


    const handleMovie = async currentPage => {
        setLoading(true);
        await axios.get("api/movie/movies/?format=json", {
            params: {
                page: currentPage,
                page_size: pagesize,
                title: search,
                category: selectedTags,
            }, paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        }).then(res => {
            setMovies(res.data.results);
            setLoading(false);
        }).catch(err => {
            console.log(err)
        });

    };


    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
        setLoading(true);
        getData(nextSelectedTags, null, null);
        setLoading(false);
    };

    const handleCountryChange = (Country, checked) => {
        const nextSelectedCountry = checked ? [...selectedCountry, Country] : selectedCountry.filter(t => t !== Country);
        setSelectedCountry(nextSelectedCountry);
        setLoading(true);
        getData(null, null, nextSelectedCountry);
        setLoading(false);
    };

    const onSearch = value => {
        setLoading(true);
        setSearch(value);
        getData(null, value, null);
        setLoading(false);
        setTip(tips[1] + "  : " + value + " ");
    };

    return (
        <Layout style={{backgroundColor: "#DEDEDE"}}>
            <BackTop/>
            <div style={{flex: "1 0 ", paddingBottom: "30px"}}>
                <Row style={{padding: "15px 0"}} gutter={[24, 8]}>
                    <Col xxl={{span: 13, offset: 3}}
                         xl={{span: 14, offset: 2}}
                         lg={{span: 14, offset: 2}}
                         md={{span: 14, offset: 1}}
                         sm={{span: 14, offset: 1}}
                         xs={{span: 22, offset: 1}}>
                        <Search
                            placeholder="Please enter keywords"
                            onSearch={value => onSearch(value)}
                            enterButton
                        />
                    </Col>
                </Row>
                <Row gutter={[24, 16]}>
                    <Col xxl={{span: 13, offset: 3}}
                         xl={{span: 14, offset: 2}}
                         lg={{span: 14, offset: 2}}
                         md={{span: 14, offset: 1}}
                         sm={{span: 14, offset: 1}}
                         xs={{span: 22, offset: 1}}
                    >
                        <Title
                            level={4}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#767676",
                                color: "#ffffff",
                                borderRadius: "5px",
                                fontSize: "18px"
                            }}
                        >{tip} ({count})
                        </Title>
                        <MovieItemList
                            key={'MovieItemList'}
                            data={movies}
                            loading={loading}
                            count={count}
                            handleChange={handleMovie}
                            pagesize={pagesize}
                        />
                    </Col>
                    <Col xxl={{span: 5, offset: 0}}
                         xl={{span: 6, offset: 0}}
                         lg={{span: 6, offset: 0}}
                         md={{span: 8, offset: 0}}
                         sm={{span: 8, offset: 0}}
                         xs={{span: 22, offset: 1}}>
                        <Row>
                            <Col>
                                <Tags
                                    key={'TagsItemList'}
                                    data={tags}
                                    selectedTags={selectedTags}
                                    selectedCountry={selectedCountry}
                                    handleChange={handleChange}
                                    handleCountryChange={handleCountryChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default MovieList;