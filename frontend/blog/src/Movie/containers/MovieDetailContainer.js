import React from 'react';
import axios from 'axios';


class MovieDetail extends React.Component {

    state = {
        movie: {}
    }

    componentDidMount() {
        const movieID = this.props.match.params.movieID;

        axios.get(`http://127.0.0.1:8000/api/movie/movies/${movieID}`)
            .then(res => {
                this.setState({
                    movie: res.data
                });
                console.log(res.data)
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.movie.name}</h1>
                <img src={this.state.movie.poster} alt=""/>
                <p>{this.state.movie.description}</p>
            </div>
        )
    }
}

export default MovieDetail;