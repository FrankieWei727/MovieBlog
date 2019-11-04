import React from 'react';
import {Card, Rating} from 'semantic-ui-react'
import {Image} from 'semantic-ui-react';

const Movies = (props) => {

    const still = props.stills.find(function (post) {
        return post.movie === props.movie.id
    });

    return (
        <div className="four wide column">
            <Card>
                <Image src={still["photo"]}/>
                <Card.Content>
                    <Card.Header><a href={`/movie/${props.movie.id}`}>{props.movie.name}</a></Card.Header>
                    <Rating icon='star' defaultRating={props.movie.rank/2} maxRating={5} disabled/>
                    <Card.Description style={{height: '100px', weight: '200px'}}>
                        {props.movie.description.substr(0, 100)}...
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Movies