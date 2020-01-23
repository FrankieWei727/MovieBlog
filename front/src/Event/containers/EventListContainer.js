import React from 'react';
import axios from 'axios';
import Event from "../components/Event";
import {Item} from 'semantic-ui-react';

class EventList extends React.Component {

    state = {
        events: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/movie/activities/')
            .then(res => {
                    this.setState({
                        events: res.data
                    });
                }
            )
    }

    render() {
        return (
            <Item.Group divided style={{padding: '30px',paddingBottom:'20em'}}>
                {this.state.events.map((event) =>
                    <Event event={event} key={event.id}/>)}
            </Item.Group>
        )
    }
}

export default EventList