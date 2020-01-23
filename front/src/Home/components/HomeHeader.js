import {Container, Header} from "semantic-ui-react";
import PropTypes from "prop-types";
import React from 'react';

const HomepageHeading = ({mobile}) => {
    return (
        <Container text>
            <Header
                as='h1'
                content='Movie Community'
                inverted
                style={{
                    fontSize: mobile ? '2em' : '3em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: mobile ? '1em' : '2em',
                }}
            />
            <Header
                as='h2'
                content='Do whatever you want when you want to.'
                inverted
                style={{
                    fontSize: mobile ? '1.5em' : '2em',
                    fontWeight: 'normal',
                    marginTop: mobile ? '1em' : '1em',
                }}
            />
        </Container>
    )

}

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

export default HomepageHeading;