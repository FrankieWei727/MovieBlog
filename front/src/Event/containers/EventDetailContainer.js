import React from 'react';
import axios from 'axios';
import {Image, Grid, Container, Header, Icon} from 'semantic-ui-react';

class EventDetail extends React.Component {

    state = {
        event: {}
    };

    componentDidMount() {
        const eventID = this.props.match.params.eventID;

        axios.get(`http://127.0.0.1:8000/api/movie/events/${eventID}/`)
            .then(res => {
                    this.setState({
                        event: res.data
                    });
                }
            )
    }

    render() {
        return (
            <div style={{paddingTop: '10em', paddingBottom: '20em'}}>
                <Container text>
                    <Header as='h2'>{this.state.event.title}</Header>
                    <div style={{paddingBottom: '1em'}}>
                        <Icon name='location arrow'/> {this.state.event.location}
                    </div>
                    <div style={{paddingBottom: '1em'}}>
                        <Icon name={'calendar times'}/> {this.state.event.start_date} to {this.state.event.end_date}
                    </div>
                    <p style={{whiteSpace: 'pre-wrap'}}>{this.state.event.content}</p>
                </Container>
                <Grid centered columns={2} style={{paddingTop: '5em'}}>
                    <Grid.Column>
                        <Image src={this.state.event.poster} size='large' alt=""/>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default EventDetail