import React from 'react';
import axios from 'axios';
import Review from "../components/Review";
import {Item, Pagination} from "semantic-ui-react";


class ReviewList extends React.Component {

    state = {
        reviews: [],
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/comment/reviews/")
            .then(res => {
                this.setState({
                    reviews: res.data
                });
            });
    }

    render() {
        return (
            <div>
                <Item.Group divided style={{padding: '30px', paddingBottom: '15em'}}>
                    {this.state.reviews.map((review) =>
                        <Review review={review} key={review.id}/>)}
                    <div style={{paddingTop: '10em'}}>
                        <Pagination defaultActivePage={1} totalPages={10}/>
                    </div>
                </Item.Group>
            </div>

        )
    }
}

export default ReviewList;