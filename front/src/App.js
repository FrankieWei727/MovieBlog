import React from 'react';
import BaseRouter from "./routes";
import {Layout} from 'antd';
import {BrowserRouter as Router} from "react-router-dom";
import HomeFooter from "./Home/containers/HomeFooterContainer";
import {connect} from 'react-redux';
import * as actions from './Store/actions/auth';
import HomeHeader from "./Home/containers/HeaderContainer";

const {Content} = Layout;

class App extends React.Component {


    componentDidMount() {
        this.props.onTryAutoSignup();

    }

    render() {
        return (
            <div>
                <Router>
                    <Layout>
                        <HomeHeader {...this.props}/>
                        <Content>
                            <BaseRouter/>
                        </Content>
                        <HomeFooter/>
                    </Layout>
                </Router>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);


