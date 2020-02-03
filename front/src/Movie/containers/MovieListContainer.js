import React from 'react';
import axios from 'axios';
import {
    Layout,
    Row,
    Col,
    Typography,
    BackTop,
    Input,
    Affix,
    Icon,
} from "antd";

import MovieItemList from "../components/MoiveList";
import Tags from "../components/Tags";
import {Link} from "react-router-dom";
import MoviePromotion from "../components/MoviePromotion";

const count = 5;
const {Title} = Typography;
const {Search} = Input;
const tip = ["All", "Search Result"];
const token = window.localStorage.getItem('token');
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1621723_13u19gbl1o2s.js'
});

class MovieList extends React.Component {

    page = 1;
    state = {
        movies: [],
        count: 0,
        tip: tip[0],
        search: "",
        tags: [],
        filterTag: "",
        loading: true,
        selectedTags: [],
        current: '',
        switch: false,
    };

    componentDidMount = async v => {
        await this.getData();
        await this.getUserProfile();
        this.setState({loading: false});
    };

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    };

    async getUserProfile() {
        if (token !== null) {
            await axios.get(
                'http://127.0.0.1:8000/rest-auth/user/',
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


    getData = async v => {
        try {
            let url = "";
            if (this.state.filterTag.length === 0) {
                url =
                    "http://127.0.0.1:8000/api/movie/movies/?format=json" +
                    "&page=" +
                    this.page +
                    "&page_size=" +
                    count +
                    "&search=" +
                    this.state.search;
            } else {
                url =
                    "http://127.0.0.1:8000/api/movie/movies/?format=json" +
                    "&page=" +
                    this.page +
                    "&page_size=" +
                    count +
                    "&search=" +
                    this.state.search +
                    "&category=" +
                    this.state.filterTag;
            }
            const response = await axios.get(url);
            const temp = [];
            for (let index = 0; index < response.data.count; index++) {
                temp.push({name: "", poster: "", author: "", id: index});
            }
            this.setState({
                movies: temp
            });
            for (let index = 0; index < response.data.results.length; index++) {
                temp[index] = response.data.results[index];
            }
            this.setState({
                movies: temp,
                count: response.data.count
            });
            if (this.state.selectedTags.length === 0) {
                const responseTag = await axios.get(
                    "http://127.0.0.1:8000/api/movie/categories_group/?format=json"
                );
                this.setState({tags: responseTag.data});
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleMovie = async page => {
        this.setState({
            loading: true
        });
        try {
            let url = "";
            if (this.state.filterTag.length === 0) {
                url =
                    "http://127.0.0.1:8000/api/movie/movies/?format=json" +
                    "&page=" +
                    page +
                    "&page_size=" +
                    count +
                    "&search=" +
                    this.state.search;
            } else {
                url =
                    "http://127.0.0.1:8000/api/movie/movies/?format=json" +
                    "&page=" +
                    page +
                    "&page_size=" +
                    count +
                    "&search=" +
                    this.state.search +
                    "?category=" +
                    this.state.filterTag;
            }
            const response = await axios.get(url);
            let temp = this.state.movies;
            let i = (page - 1) * count;
            for (let index = 0; index < response.data.results.length; index++) {
                temp[i] = response.data.results[index];
                i++;
            }
            this.setState({
                movies: temp,
                loading: false
            });
            console.log(this.state.movies);
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = async (tag, checked) => {
        const {selectedTags} = this.state;
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);
        await this.setState({
            selectedTags: nextSelectedTags,
            loading: true
        });
        const temp = [];
        for (let i of nextSelectedTags) {
            temp.push(i.id);
        }
        const filterTag = temp.join("?category=");
        await this.setState({
            filterTag: filterTag
        });
        this.getData();
        this.setState({
            loading: false
        });
    };

    search = async value => {
        await this.setState({
            loading: true,
            search: value
            // search: this.props.location.state.searchName
        });
        this.getData();
        const temp = tip[1] + "  : " + value + " ";
        this.setState({
            loading: false,
            tip: temp
        });
    };

    render() {
        return (
            <Layout style={{minHeight: "100vh"}}>
                <BackTop/>
                <div style={{flex: "1 0 ", backgroundColor: "#ffffff", padding: '0px 60px'}}>
                    <Affix offsetTop={this.state.top}>
                        <Row style={{
                            padding: "20px 60px",
                            marginBottom: "10px",
                        }}>
                            <Col xxl={{span: 8, offset: 1}} xl={{span: 13, offset: 1}} md={{span: 13, offset: 1}}
                                 xs={{span: 22, offset: 1}}>
                                <Search
                                    placeholder="Please enter keywords"
                                    onSearch={value => this.search(value)}
                                    enterButton
                                />
                            </Col>
                        </Row>
                    </Affix>
                    <Row style={{paddingTop: "0px", paddingBottom: "30px"}}>
                        <Col xxl={{span: 10, offset: 5}} xl={{span: 13, offset: 2}} md={{span: 14, offset: 1}}
                             xs={{span: 22, offset: 1}} style={{paddingTop: "0px", paddingBottom: "30px"}}>
                            <Title
                                level={4}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#767676",
                                    color: "#ffffff",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    fontSize: "18px"
                                }}
                            >
                                {this.state.tip} ({this.state.count})
                            </Title>
                            <MovieItemList
                                key={'MovieItemList'}
                                data={this.state.movies}
                                oading={this.state.loading}
                                count={this.state.count}
                                handleChange={this.handleMovie}
                            />
                        </Col>
                        <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 1}}
                             xs={{span: 22, offset: 1}} style={{paddingLeft: "15px"}}>
                            <MoviePromotion/>
                        </Col>
                        <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 1}}
                             xs={{span: 22, offset: 1}} style={{paddingLeft: "15px"}}>
                            <Tags
                                key={'TagsItemList'}
                                data={this.state.tags}
                                selectedTags={this.state.selectedTags}
                                handleChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default MovieList;