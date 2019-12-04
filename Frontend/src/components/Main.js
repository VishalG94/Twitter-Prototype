import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
import SignUp from './SignUp/SignUp'
import Navbar from './LandingPage/Navbar'
import Messages from './Messages/Messages'
import Profile from './Profile/Profile'
import Search from './Search/Search'
import UserProfile from './Profile/UserProfile'
import PrivateRoute from '../lib/PrivateRoute'
import Dashboard from './Dashboard/Dashboard'
import GraphLikes from './Dashboard/GraphLikes'
import GraphRe from './Dashboard/GraphRetweet'
import Barday from './Dashboard/Barday'
import UserTweets from './UserTweets/UserTweets'
import UserLikes from './UserTweets/UserLikes'
import ViewTweet from './Tweet/ViewTweet'
import SearchProfileTweets from './UserTweets/SearchProfileTweets'
import Followers from './Dashboard/Followers'
import BookMarkedTweets from './UserTweets/BookMarkedTweets'
import Lists from './Lists/Lists'
import ListDetails from './ListDetails/ListDetails'
import SubscribedList from './Lists/SubscribedList'
import UserSubscribedLists from './UserLists/UserSubscribedLists'
import UserLists from './UserLists/UserLists'

import Following from './Dashboard/Following'
import UserRetweets from './UserTweets/UserRetweets'
// Create a Main Component

class Main extends Component {
  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path='/' component={Navbar} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={Search} />
        <Route path='/signup' component={SignUp} />
        <Route path='/home' component={Home} />
        <PrivateRoute path='/messages' component={Messages} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute  path='/userprofile' component={UserProfile} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/graphlike' component={GraphLikes} />
        <PrivateRoute path='/graphre' component={GraphRe} />
        <PrivateRoute path='/barday' component={Barday} />
        <PrivateRoute  path='/usertweets' component={UserTweets} />
        <PrivateRoute path='/tweets' component={SearchProfileTweets} />
        <PrivateRoute path='/likes' component={SearchProfileTweets} />
        <PrivateRoute  path='/userlikes' component={UserLikes} />
        <PrivateRoute path='/followers' component={Followers} />
        <PrivateRoute path='/following' component={Following} />
        <PrivateRoute path='/bookmarks' component={BookMarkedTweets} />
        <Route path='/lists' component={Lists} />
        <PrivateRoute path='/listdetails' component={ListDetails} />
        <PrivateRoute path='/subscribedlist' component={SubscribedList} />
        <PrivateRoute path='/userlists' component={UserLists} />
        <PrivateRoute path='/usersubscribedlist' component={UserSubscribedLists} /> 
            
       
        <PrivateRoute static path='/viewtweet/:id' component={ViewTweet} />
        <PrivateRoute  path='/userretweets' component={UserRetweets} />
      </div>
    )
  }
}
// Export The Main Component
export default Main
