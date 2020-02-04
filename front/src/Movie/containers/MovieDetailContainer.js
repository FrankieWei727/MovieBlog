import React from 'react';
import axios from 'axios';
import {Layout, Row, Col, Descriptions, Tag, Typography, List, BackTop, Icon} from 'antd'
import StillList from "../components/Stills";
import AddMovieReview from "../components/AddMovieReview";
import moment from "moment";

const {Title} = Typography;


class MovieDetail extends React.Component {

    state = {
        movie: {},
        prelock: false,
        iFrameHeight: '0px',
    };

    componentDidMount() {
        const movieID = this.props.match.params.movieID;

        axios.get(`api/movie/movies/${movieID}/?format=json`)
            .then(res => {
                this.setState({
                    movie: res.data,
                });
            })
            .catch(err => {
                console.log(err)
            });

        this.setState({prelock: true});
    }

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
            <Layout style={{minHeight: '100vh', background: 'unset',paddingTop:'60px'}}>
                <BackTop/>
                <div style={{flex: '1 0 '}}>
                    <Row style={{boxShadow: '0px 0px 5px #888888'}}>
                        <div className='MovieHeader'
                             style={{
                                 position: 'relative',
                                 overflow: 'hidden',
                                 background: 'hsla(0, 10%, 60%, 0.5)'
                             }}>
                            <div style={{
                                background: `url(${movie.poster})`,
                                position: 'absolute',
                                filter: 'blur(20px)',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: -1,
                                overflow: 'hidden'
                            }}/>
                            <Col xxl={{span: 14, offset: 5}} xl={{span: 20, offset: 2}} xs={{span: 22, offset: 1}}>
                                <div className='wrap' style={{
                                    background: 'rgba(0,30%,100%,90%)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '20px 0'
                                }}>
                                    <div className='MovieCover'>
                                        <img
                                            src={movie.poster}
                                            alt={movie.name}
                                            style={{
                                                width: '225px',
                                                maxHeight: '300px',
                                                border: '4px solid white',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </div>
                                    <div className='content' style={{marginLeft: '20px'}}>
                                        <Title level={3} style={{color: 'white'}}>{movie.name}</Title>
                                        <Descriptions
                                            border
                                            column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1}}
                                            style={{color: '#fff'}}
                                        >
                                            <Descriptions.Item
                                                label={<span style={{color: '#fff'}}>Release Date</span>}>
                                                <div style={{
                                                    color: '#fff',
                                                    fontWeight: '700'
                                                }}>{moment(movie.release_date).format('YYYY-MM')}</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Length</span>}>
                                                <div style={{color: '#fff', fontWeight: '700'}}>{movie.length}</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Region</span>}>
                                                <div style={{color: '#fff', fontWeight: '700'}}>{movie.region}</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Language</span>}>
                                                <div style={{color: '#fff', fontWeight: '700'}}>{movie.language}</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Rank</span>}>
                                                <div style={{color: '#fff', fontWeight: '700'}}>{movie.rank}/5.00</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Views</span>}>
                                                <div
                                                    style={{color: '#fff', fontWeight: '700'}}>{movie.movie_views}</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Likes</span>}>
                                                <div style={{color: '#fff', fontWeight: '700'}}>{likes}</div>
                                            </Descriptions.Item>
                                            <Descriptions.Item label={<span style={{color: '#fff'}}>Actors</span>}>
                                                <div
                                                    style={{color: '#fff', fontWeight: '700'}}>{movie.actors}</div>
                                            </Descriptions.Item>
                                        </Descriptions>
                                        {movie.category &&
                                        movie.category.map(tag => (
                                            <Tag key={tag.name} color='#fff' style={{margin: '5px'}}>
                                                <div style={{color: '#000'}}>
                                                    {tag.name}
                                                </div>
                                            </Tag>
                                        ))}
                                        # TODO: add user like
                                        <Descriptions>
                                            <Descriptions.Item>
                                                <div style={{paddingTop: "4px"}}>
                                                    <Icon type="heart" theme="filled"
                                                          style={{fontSize: '20px', color: "red"}}/>
                                                </div>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </div>
                                </div>
                            </Col>
                        </div>
                        <div>
                            <iframe
                                title="Movie Trailer"
                                ref="iframe"
                                src={movie.video}
                                width="100%"
                                height="500px"
                                scrolling="no"
                                frameBorder="0"
                            />
                        </div>
                    </Row>
                    <Row style={{paddingTop: '30px', paddingBottom: '30px'}}>
                        <Col xxl={{span: 10, offset: 5}} xl={{span: 13, offset: 2}} md={{span: 15, offset: 1}}
                             xs={{span: 22, offset: 1}}>
                            <Title level={4}>About</Title>
                            <div style={{padding: '24px 0', whiteSpace: 'pre-wrap'}}>
                                <p style={{whiteSpace: 'pre-wrap'}}>{movie.description}</p>
                            </div>
                            {prelock && (stills_numbers !== 0) && (
                                <StillList key={'StillItemList'} data={movie.stills} title='Stills'/>
                            )}
                            {/*{prelock && (this.state.director.length !== 0) && (*/}
                            {/*  <RowList data={this.state.director} title='导演' />*/}
                            {/*)}*/}
                            {/*{prelock && (this.state.writer.length !== 0) && (*/}
                            {/*  <RowList data={this.state.writer} title='编剧' />*/}
                            {/*)}*/}
                            {/*{prelock && (this.state.actor.length !== 0) && (*/}
                            {/*  <RowList data={this.state.actor} title='演员' />*/}
                            {/*)}*/}
                            <Title level={4}>Movie Review</Title>
                            <AddMovieReview
                                key={'AddMovieReview'}
                                movieId={movie.id}
                                movieUrl={movie.url}
                            />
                        </Col>
                        <Col xxl={{span: 4, offset: 0}} xl={{span: 7, offset: 0}} md={{span: 7, offset: 0}}
                             xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                            {prelock && (video_source_numbers !== 0) && (
                                <div style={{
                                    marginTop: '20px',
                                    marginBottom: '40px'
                                }}>
                                    <h3 style={{marginRight: '20px', fontWeight: 'bold'}}>Play lists</h3>
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
                    </Row>
                </div>
            </Layout>
        )
    }
}

export default MovieDetail;