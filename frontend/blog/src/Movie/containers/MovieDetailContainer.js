import React from 'react';
import axios from 'axios';
import {Grid, Image, Header, Container, Icon, Statistic, List} from "semantic-ui-react";

class MovieDetail extends React.Component {

    state = {
        movie: {}
    };

    componentDidMount() {
        const movieID = this.props.match.params.movieID;

        axios.get(`http://127.0.0.1:8000/api/movie/movies/${movieID}`)
            .then(res => {
                this.setState({
                    movie: res.data
                });
            });
    }

    render() {

        let likes = 0;
        if (this.state.movie.users_like) {
            likes = this.state.movie.users_like.length;
        } else {
            likes = 0;
        }

        return (
            <Grid container style={{paddingTop: '10em'}}>
                <Grid>
                    <Header as={'h1'}>{this.state.movie.name}</Header>
                </Grid>
                <Grid.Row>
                    <Grid.Column width={9}>
                        <Image src={this.state.movie.poster}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Statistic size='mini' horizontal label='Views' value={this.state.movie.movie_views}/>
                        <Statistic size='mini' horizontal label='Likes' value={likes}/>
                        <Icon size='large' color='red' name='like'/>
                    </Grid.Column>
                </Grid.Row>
                <Grid>
                    <Container style={{paddingBottom: '5em'}}>
                        <List size='large'>
                            <List.Item><List.Header>Year</List.Header> {this.state.movie.year}</List.Item>
                            <List.Item><List.Header>Language</List.Header> {this.state.movie.language}</List.Item>
                            <List.Item><List.Header>Director</List.Header>{this.state.movie.director}</List.Item>
                            <List.Item><List.Header>Scriptwriter</List.Header> {this.state.movie.scriptwriter}
                            </List.Item>
                            <List.Item><List.Header>Nation</List.Header> {this.state.movie.nation}</List.Item>
                            <List.Item><List.Header>Star</List.Header> {this.state.movie.star}</List.Item>
                            <List.Item><List.Header>Description</List.Header> <p>{this.state.movie.description}</p>
                            </List.Item>
                        </List>
                    </Container>
                </Grid>
            </Grid>
        )
    }
}

export default MovieDetail;