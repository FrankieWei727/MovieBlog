import React from 'react';
import {Button, Icon, Item,} from 'semantic-ui-react'

const Event = (props) => {

    return (
        <Item style={{paddingBottom:'10px'}} >
            <Item.Image src={props.event.poster}/>
            <Item.Content>
                <Item.Header as='a' href={`/event/${props.event.id}`}>{props.event.title}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>{props.event.location}</span>
                </Item.Meta>
                <Item.Description>{props.event.body.substr(0, 400)}...</Item.Description>
                <Item.Extra>
                    <Button primary floated='right' href={`/event/${props.event.id}`}>
                        More Detail
                        <Icon name='right chevron'/>
                    </Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
};

export default Event