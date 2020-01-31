import React from 'react';
import {Route} from 'react-router-dom';

import MovieList from "./Movie/containers/MovieListContainer";
import MovieDetail from "./Movie/containers/MovieDetailContainer";
import MovieSourceEditor from "./User/Profile/components/UploadMovieSource";
import MovieStillsSourceEditor from "./User/Profile/components/UploadMovieStills";
import MoviePlaySourceEditor from "./User/Profile/components/UploadMoviePlaySource";
import Login from "./User/Login";
import Logout from "./User/Logout";
import Register from "./User/Register";
import EventList from "./Event/containers/EventListContainer";
import EventDetail from "./Event/containers/EventDetailContainer";
import Blog from "./Article/containers/ArticleListContainer";
import CreateArticle from "./Article/components/CreateArticle";
import ArticleDetail from "./Article/containers/ArticleDetailContainer";
import MyProfileContainer from "./User/Profile/containers/MyProfileContainer";
import VisitOtherUserProfile from "./User/Profile/containers/VisitOtherUserProfileContainer";
import EditProfile from "./User/Profile/components/EditProfile";
import SetPermission from "./User/Profile/components/SetPermission";
import ReviseArticle from "./User/Profile/components/ReviseArticle";
// import Switch from "react-switch";

const BaseRouter = () => (
    <div>
        {/*<Route exact path='/home/' component={Home}/>*/}
        <Route exact path='/movie/' component={MovieList}/>
        <Route exact path='/movie/:movieID/' component={MovieDetail}/>
        <Route exact path='/movie_upload' component={MovieSourceEditor}/>
        <Route exact path='/video_source_upload' component={MoviePlaySourceEditor}/>
        <Route exact path='/stills_upload' component={MovieStillsSourceEditor}/>
        <Route exact path='/event/' component={EventList}/>
        <Route exact path='/event/:eventID/' component={EventDetail}/>
        <Route exact path='/login/' component={Login}/>
        <Route exact path='/logout/' component={Logout}/>
        <Route exact path='/signup/' component={Register}/>
        <Route exact path='/profile/' component={MyProfileContainer}/>
        <Route exact path='/visit/profile/:id' component={VisitOtherUserProfile}/>
        <Route exact path='/profile/setting/' component={EditProfile}/>
        <Route exact path='/permission/setting' component={SetPermission}/>
        <Route exact path='/article' component={Blog}/>
        <Route exact path='/create_article' component={CreateArticle}/>
        <Route exact path='/article/:articleID/' component={ArticleDetail}/>
        <Route exact path='/article/revise/:articleID/' component={ReviseArticle}/>
    </div>

);

export default BaseRouter;