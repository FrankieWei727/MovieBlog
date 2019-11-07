import React from 'react';
import {Item} from 'semantic-ui-react'

const Review = (props) => {


    return (
        <Item style={{paddingBottom: '10px'}}>
            <Item.Content>
                <Item.Header as='a' href={`/review/${props.review.id}`}>{props.review.title}</Item.Header>
                <Item.Meta>
                    <p>{props.review.author.username}</p>
                </Item.Meta>
                <Item.Meta>
                    <p>{props.review.movie.name}</p>
                </Item.Meta>
                <Item.Description>{props.review.body.substr(0, 400)}...</Item.Description>
            </Item.Content>
        </Item>
    )
};

export default Review