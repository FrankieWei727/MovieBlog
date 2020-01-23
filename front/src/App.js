import React from 'react';
import BaseRouter from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import DesktopContainer from "./Home/containers/DesktopContainer";
import MobileContainer from "./Home/containers/MobileContainer";
import FooterContainer from "./Home/containers/HomeFooterContainer";
import {connect} from 'react-redux';
import * as actions from './Store/actions/auth';

class App extends React.Component {


    componentDidMount() {
        this.props.onTryAutoSignup();

    }

    render() {
        return (
            <div>
                <Router>
                    <DesktopContainer {...this.props}/>
                    <MobileContainer {...this.props}/>
                    <BaseRouter/>
                    <FooterContainer/>
                </Router>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);


