import React from 'react';
import {Item} from 'semantic-ui-react'

const Article = (props) => {


    return (
        <Item style={{paddingBottom: '10px'}}>
            <Item.Content>
                <Item.Header as='a' href={`/article/${props.article.id}`}>{props.article.title}</Item.Header>
                <Item.Meta>
                    <p>{props.article.author.username}</p>
                </Item.Meta>
                <Item.Meta>
                    <p>{props.article.movie.name}</p>
                </Item.Meta>
                <Item.Description>{props.article.content.substr(0, 400)}...</Item.Description>
            </Item.Content>
        </Item>
    )
};

export default Article