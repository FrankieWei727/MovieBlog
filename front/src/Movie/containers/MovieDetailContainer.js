import React from 'react';
import axios from 'axios';
import {Layout, Row, Col, Descriptions, Tag, Typography, List, BackTop} from 'antd'
import StillList from "../components/Stills";
import AddMovieReview from "../components/AddMovieReview";
import moment from "moment";
import MovieLike from "../components/MovieLike";
import MovieFansList from "../components/MovieFansList";

const {Title} = Typography;


class MovieDetail extends React.Component {

    state = {
        movie: {},
        prelock: false,
        iFrameHeight: '0px',
    };

    componentDidMount = async (v) => {
        const movieID = this.props.match.params.movieID;

        await axios.get(`api/movie/movies/${movieID}/?format=json`)
            .then(res => {
                this.setState({
                    movie: res.data,
                });
            }).catch(err => {
                console.log(err)
            });
        this.setState({prelock: true});
    };


    render() {

        const {prelock} = this.state;
        const {movie} = this.state;

        let likes = 0;
        if (movie.users_like) {
            likes = movie.users_like.length;
        } else {
            likes = 0;
        }
        let video_source_numbers = 0;
        if (movie.videos) {
            video_source_numbers = movie.videos.length;
        } else {
            video_source_numbers = 0;
        }

        let stills_numbers = 0;
        if (movie.stills) {
            stills_numbers = movie.stills.length;
        } else {
            stills_numbers = 0;
        }
        return (
            <Layout>
                <BackTop/>
                <div style={{flex: '1 0 '}}>
                    <Row style={{boxShadow: '0px 0px 5px #888888', marginBottom: "20px"}}>
                        <div className='movie-header'>
                            <div style={{
                                backgroundImage: `url(${movie.poster})`,
                                position: 'absolute',
                                filter: 'blur(20px)',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 0,
                                overflow: 'hidden'
                            }}/>
                            <Col xxl={{span: 22, offset: 3}}
                                 xl={{span: 20, offset: 2}}
                                 lg={{span: 20, offset: 2}}
                                 md={{span: 20, offset: 2}}
                                 sm={{span: 20, offset: 2}}
                                 xs={{span: 22, offset: 1}}
                            >
                                <div className='wrap'>
                                    <Row gutter={[{xs: 0, sm: 0, md: 16, xxl: 24}, {xs: 16, sm: 16, md: 0}]}>
                                        <Col xxl={{span: 4}}
                                             xl={{span: 6}}
                                             lg={{span: 6}}
                                             md={{span: 8}}
                                             sm={{span: 20}}>
                                            <img className='movie-cover'
                                                 src={movie.poster}
                                                 alt={movie.title}
                                            />
                                        </Col>
                                        <Col xxl={{span: 14}}
                                             xl={{span: 18}}
                                             lg={{span: 18}}
                                             md={{span: 16}}
                                             sm={{span: 20}}>
                                            <div className='movie-content'>
                                                <div style={{float: "left"}}>
                                                    <Title level={3} className="movie-label">{movie.title}</Title>
                                                </div>
                                                <MovieLike movieId={this.props.match.params.movieID}
                                                           key={'movie_like_action'}/>
                                                <Descriptions
                                                    border
                                                    column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1}}
                                                >
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Release Date</span>}>
                                                        <div className="movie-description">
                                                            {moment(movie.release_date).format('YYYY-MM')}
                                                        </div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Runtime</span>}>
                                                        <div className="movie-description">{movie.runtime}</div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Region</span>}>
                                                        <div className="movie-description">{movie.countries}</div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Language</span>}>
                                                        <div className="movie-description">{movie.languages}</div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Rate</span>}>
                                                        <div className="movie-description">{movie.user_rating}/5.00
                                                        </div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Views</span>}>
                                                        <div className="movie-description">{movie.amount_reviews}</div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Directors</span>}>
                                                        <div className="movie-description">{movie.directors}</div>
                                                    </Descriptions.Item>
                                                    {movie.scriptwriters ?
                                                        <Descriptions.Item
                                                            label={<span className="movie-label">Writers</span>}>
                                                            <div
                                                                className="movie-description">{movie.scriptwriters}</div>
                                                        </Descriptions.Item> : null
                                                    }
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Likes</span>}>
                                                        <div className="movie-description">{likes}</div>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item
                                                        label={<span className="movie-label">Actors</span>}>
                                                        <div className="movie-description">{movie.actors}</div>
                                                    </Descriptions.Item>
                                                </Descriptions>
                                                {movie.categories &&
                                                movie.categories.map(tag => (
                                                    <Tag key={tag.name} color='#fff' style={{margin: '5px'}}>
                                                        <div style={{color: '#000'}}>
                                                            {tag.name}
                                                        </div>
                                                    </Tag>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </div>
                        <div>
                            <iframe
                                title="Movie Trailer"
                                ref="iframe"
                                src={movie.trailer}
                                width="100%"
                                height="500px"
                                scrolling="no"
                                frameBorder="0"
                            />
                        </div>
                    </Row>
                    <Row gutter={[24, 8]}>
                        <Col xxl={{span: 12, offset: 3}}
                             xl={{span: 12, offset: 2}}
                             lg={{span: 12, offset: 2}}
                             md={{span: 20, offset: 1}}
                             sm={{span: 20, offset: 1}}
                             xs={{span: 22, offset: 1}}>
                            <div>
                                <Title level={4}>About</Title>
                                <div>{movie.description}</div>
                            </div>
                            <div style={{paddingTop: "10px"}}>
                                {prelock && (stills_numbers !== 0) && (
                                    <StillList key={'StillItemList'} data={movie.stills} title='Stills'/>
                                )}
                            </div>
                            {/*{prelock && (this.state.director.length !== 0) && (*/}
                            {/*  <RowList data={this.state.director} title='导演' />*/}
                            {/*)}*/}
                            {/*{prelock && (this.state.writer.length !== 0) && (*/}
                            {/*  <RowList data={this.state.writer} title='编剧' />*/}
                            {/*)}*/}
                            {/*{prelock && (this.state.actor.length !== 0) && (*/}
                            {/*  <RowList data={this.state.actor} title='演员' />*/}
                            {/*)}*/}
                            <MovieFansList movieId={this.props.match.params.movieID} key={'movie_fans_list'}/>
                        </Col>
                        <Col xxl={{span: 8, offset: 0}}
                             xl={{span: 8, offset: 0}}
                             lg={{span: 8, offset: 0}}
                             md={{span: 8, offset: 1}}
                             sm={{span: 15, offset: 1}}
                             xs={{span: 22, offset: 1}}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    {prelock && (video_source_numbers !== 0) && (
                                        <div>
                                            <Title level={4}>Play lists</Title>
                                            <div>
                                                <List
                                                    size="small"
                                                    bordered={false}
                                                    split={false}
                                                    dataSource={movie.videos}
                                                    renderItem={item =>
                                                        <List.Item>
                                                            <a key={item.url} href={item.url} target="_blank"
                                                               rel="noreferrer noopener">
                                                                {item.website}
                                                            </a>
                                                        </List.Item>}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Col>
                                <Col>
                                    <div>
                                        <Title level={4}>Movie Review</Title>
                                        <AddMovieReview
                                            key={'AddMovieReview'}
                                            movieId={movie.id}
                                            movieUrl={movie.url}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Layout>
        )
    }
}

export default MovieDetail;