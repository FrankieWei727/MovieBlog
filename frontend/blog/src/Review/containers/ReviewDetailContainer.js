import React from 'react';
import axios from 'axios';
import {Comment, Container, Header, Icon} from "semantic-ui-react";
import moment from 'moment';
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

        axios.get('http://127.0.0.1:8000/api/comment/replys/')
            .then(res => {
                let reply = [];
                res.data.forEach(req => {
                    if (req.comment === parseInt(reviewID)) {
                        reply.push(req);
                    }
                });
                this.setState({
                    reply: reply,
                });
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
                            <Comment key={'rep'+rep.id}>
                                <Comment.Avatar src={rep.author.profile.avatar}/>
                                <Comment.Content>
                                    <Comment.Author as='a'>{rep.author.username}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{moment(rep.created).format('YYYY-MM-DD HH:mm:ss')}</div>
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