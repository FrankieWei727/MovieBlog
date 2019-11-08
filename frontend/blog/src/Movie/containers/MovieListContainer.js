import React from 'react';
import axios from 'axios';
import Movies from "../components/Movie";


class MovieList extends React.Component {

    state = {
        movies: [],
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/movie/movies")
            .then(res => {
                this.setState({
                    movies: res.data,
                });
            });
    }
    render() {

        return (
            <div className="ui stackable four column grid" style={{padding: '30px', paddingBottom: '20em'}}>
                {this.state.movies.map((movie) =>
                    <Movies movie={movie} key={'movie'+movie.id}/>)}
            </div>
        )
    }
}

export default MovieList;