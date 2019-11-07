import React from 'react';
import axios from 'axios';
import {Comment, Container, Header, Icon} from "semantic-ui-react";

class ReviewDetail extends React.Component {

    state = {
        review: {},
        author: {},
        movie: {},
        reply: [],
    };

    componentDidMount() {
        const reviewID = this.props.match.params.reviewID;

        axios.get(`http://127.0.0.1:8000/api/comment/reviews/${reviewID}`)
            .then(res => {
                this.setState({
                    review: res.data,
                    author: res.data.author,
                    movie: res.data.movie

                });
            });

        const id = this.state.review.id;

        axios.get('http://127.0.0.1:8000/api/comment/replys/')
            .then(res => {
                let reply = [];
                res.data.forEach(req => {
                    if (req.comment.id === id) {
                        reply.push(req);
                    }
                });
                this.setState({
                    reply: reply,
                });
                console.log(this.state.reply);
            });


    }

    render() {
        return (
            <div>
                <Container text style={{marginTop: '7em', marginBottom: '7em'}}>
                    <Header as='h1'>{this.state.review.title}</Header>
                    <div style={{paddingBottom: '1em'}}>
                        <Icon name={'film'}/>
                        <a href={`/movie/${this.state.movie.id}`}>{this.state.movie.name}</a>
                    </div>
                    <div style={{paddingBottom: '1em'}}>
                        <Icon name={'time'}/> {this.state.review.created}
                    </div>
                    <p>By {this.state.author.username}</p>
                    <p style={{whiteSpace: 'pre-wrap'}}>{this.state.review.body}</p>

                    <Comment.Group style={{paddingTop: '5em'}}>
                        <Header as='h3' dividing>
                            Comments
                        </Header>
                        {this.state.reply.map((rep) =>
                            <Comment>
                                <Comment.Avatar src='/images/avatar/small/matt.jpg'/>
                                <Comment.Content>
                                    <Comment.Author as='a'>{rep.author.username}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{rep.created}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{rep.body}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        )}
                    </Comment.Group>
                </Container>
            </div>

        )
    }
}

export default ReviewDetail