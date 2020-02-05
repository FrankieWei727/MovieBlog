import React from 'react';
import {Container, Grid, Header, List, Segment} from "semantic-ui-react";
import axios from "axios";


class HomeFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };
    }

    state = {
        username: "",
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.token !== null) {
            axios.get(
                'rest-auth/user/' + '?format=json',
                {headers: {'Authorization': 'Token ' + nextProps.token}}
            ).then(response => {
                    this.setState({
                        username: response.data.username,
                    });
                }
            ).catch(err => {
                console.log(err)
            });
        }
    };

    render() {
        const {username} = this.state;
        return (
            <div>
                {
                    username !== 'admin' ?
                        <Segment inverted vertical style={{padding: '5em 0em'}} color="grey">
                            <Container>
                                <Grid divided inverted stackable>
                                    <Grid.Row>
                                        <Grid.Column width={3}>
                                            <Header inverted as='h4' content='About'/>
                                            <List link inverted>
                                                <List.Item as='a'>Mlinked</List.Item>
                                                <List.Item as='a'>Contact Us</List.Item>
                                                <List.Item as='a'>Team</List.Item>
                                            </List>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <Header inverted as='h4' content='Services'/>
                                            <List link inverted>
                                                <List.Item as='a'>Banana Pre-Order</List.Item>
                                                <List.Item as='a'>DNA FAQ</List.Item>
                                                <List.Item as='a'>How To Access</List.Item>
                                                <List.Item as='a'>Favorite X-Men</List.Item>
                                            </List>
                                        </Grid.Column>
                                        <Grid.Column width={7}>
                                            <Header as='h4' inverted>
                                                Mlinked
                                            </Header>
                                            <p>
                                                Mlinked is here. The best place to share your ideas.
                                            </p>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </Segment>
                        :
                        null
                }
            </div>
        )
    }
}

export default HomeFooter