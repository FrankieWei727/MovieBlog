import React from 'react';
import {Route} from 'react-router-dom';

import MovieList from "./Movie/containers/MovieListContainer";
import MovieDetail from "./Movie/containers/MovieDetailContainer";
import Login from "./User/Login";
import SignUp from "./User/SignUp";
import Home from "./Home/components/Home";
import EventList from "./Event/containers/EventListContainer";
import EventDetail from "./Event/containers/EventDetailContainer";
import UserDetail from "./User/UserDetail";
import ReviewList from "./Review/containers/ReviewListContainer";
import ReviewDetail from "./Review/containers/ReviewDetailContainer";
import Switch from "react-switch";

const BaseRouter = () => (
    <div>
        <Route exact path='/home/' component={Home}/>
        <Route exact path='/movie/' component={MovieList}/>
        <Route exact path='/movie/:movieID/' component={MovieDetail}/>
        <Route exact path='/event/' component={EventList}/>
        <Route exact path='/event/:eventID/' component={EventDetail}/>
        <Route exact path='/login/' component={Login}/>
        <Route exact path='/signup/' component={SignUp}/>
        <Route exact path='/profile/' component={UserDetail}/>
        <Route exact path='/review' component={ReviewList}/>
        <Route exact path='/review/:reviewID/' component={ReviewDetail}/>
    </div>

);

export default BaseRouter;