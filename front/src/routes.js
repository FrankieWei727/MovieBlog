import React from 'react';
import {Route} from 'react-router-dom';

import MovieList from "./Movie/containers/MovieListContainer";
import MovieDetail from "./Movie/containers/MovieDetailContainer";
import MovieSourceEditor from "./Movie/components/UploadMovieSource";
import MovieStillsSourceEditor from "./Movie/components/UploadMovieStills";
import MoviePlaySourceEditor from "./Movie/components/UploadMoviePlaySource";
import Login from "./User/Login";
import Logout from "./User/Logout";
import Register from "./User/Register";
import EventListContainer from "./Event/containers/EventListContainer";
import EventDetail from "./Event/containers/EventDetailContainer";
import Blog from "./Article/containers/ArticleListContainer";
import CreateArticle from "./Article/components/CreateArticle";
import ArticleDetail from "./Article/containers/ArticleDetailContainer";
import MyProfileContainer from "./User/Profile/containers/MyProfileContainer";
import VisitOtherUserProfile from "./User/Profile/containers/VisitOtherUserProfileContainer";
import EditProfile from "./User/Profile/components/EditProfile";
import PermissionSetting from "./User/Profile/components/PermissionSetting";
import ReviseArticle from "./User/Profile/components/ReviseArticle";
import AdminLayout from "./Admin/containers/AdminLayout";
// import Switch from "react-switch";

const BaseRouter = () => (
    <div>
        <Route exact path='/movie/' component={MovieList}/>
        <Route path='/movie/:movieID' component={MovieDetail}/>
        <Route exact path='/movie_upload' component={MovieSourceEditor}/>
        <Route exact path='/video_source_upload' component={MoviePlaySourceEditor}/>
        <Route exact path='/stills_upload' component={MovieStillsSourceEditor}/>
        <Route exact path='/event/' component={EventListContainer}/>
        <Route exact path='/event/:eventID/' component={EventDetail}/>
        <Route exact path='/login/' component={Login}/>
        <Route exact path='/logout/' component={Logout}/>
        <Route exact path='/signup/' component={Register}/>
        <Route exact path='/profile/' component={MyProfileContainer}/>
        <Route exact path='/visit/profile/:id' component={VisitOtherUserProfile}/>
        <Route exact path='/profile/setting/' component={EditProfile}/>
        <Route exact path='/permission/setting' component={PermissionSetting}/>
        <Route exact path='/article' component={Blog}/>
        <Route exact path='/create_article' component={CreateArticle}/>
        <Route exact path='/article/:articleID/' component={ArticleDetail}/>
        <Route exact path='/article/revise/:articleID/' component={ReviseArticle}/>

        <Route exact path='/admin_mlinked/' component={AdminLayout}/>
    </div>

);

export default BaseRouter;