import React from "react";
import {Table} from "antd";
import axios from "axios";

const pagesize = 8;

class MovieDataAdmin extends React.Component {

    page = 1;
    state = {
        movies: [],
        count: 0,
    };

    componentDidMount = async (v) => {
        await this.getData();
    };

    getData = async v => {
        try {
            const response = await axios.get("api/movie/movies/?format=json" + "&page=" + this.page + "&page_size=" + pagesize);
            const temp = [];
            for (let index = 0; index < response.data.count; index++) {
                temp.push();
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
        } catch (error) {
            console.log(error);
        }
    };

    handleMovie = async page => {
        try {
            const response = await axios.get("api/movie/movies/?format=json" + "&page=" + page + "&page_size=" + pagesize);
            let temp = this.state.movies;
            let i = (page - 1) * pagesize;
            for (let index = 0; index < response.data.results.length; index++) {
                temp[i] = response.data.results[index];
                i++;
            }
            this.setState({
                movies: temp,
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {movies} = this.state;
        const columns = [
            {
                title: 'Movie Name',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
            },
            {
                title: 'Region',
                width: 100,
                dataIndex: 'region',
                key: 'region',
            }, {
                title: 'Length',
                width: 100,
                dataIndex: 'length',
                key: 'length',
            },
            // {
            //     title: 'Category',
            //     width: 100,
            //     dataIndex: 'category',
            //     key: 'category',
            //     fixed: 'left',
            // },
            {
                title: 'Language',
                width: 100,
                dataIndex: 'language',
                key: 'language',
            },
            {
                title: 'Release Date',
                width: 100,
                dataIndex: 'release_date',
                key: 'release_date',
            },
            {
                title: 'Director',
                width: 150,
                dataIndex: 'director',
                key: 'director',
                ellipsis: true,
            },
            {
                title: 'Scriptwriter',
                width: 150,
                dataIndex: 'scriptwriter',
                key: 'scriptwriter',
                ellipsis: true,
            },
            {
                title: 'actors',
                width: 150,
                dataIndex: 'actors',
                key: 'actors',
                ellipsis: true,
            }, {
                title: 'Rate',
                width: 100,
                dataIndex: 'rank',
                key: 'rank',
            }, {
                title: 'Poster',
                width: 100,
                dataIndex: 'poster',
                key: 'poster',
                ellipsis: true,
            }, {
                title: 'Video',
                width: 100,
                dataIndex: 'video',
                key: 'video',
                ellipsis: true,
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => <a>action</a>,
            },
        ];

        return (
            <div>
                <Table
                    rowKey="id"
                    pagination={{
                        onChange: this.handleMovie,
                        total: this.state.count,
                        pageSize: pagesize,
                    }}
                    size="middle"
                    columns={columns}
                    dataSource={movies}
                    scroll={{x: 1400,y:800}}/>
            </div>
        )
    }

}

export default MovieDataAdmin