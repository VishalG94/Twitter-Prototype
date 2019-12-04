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
        <Route path='/messages' component={Messages} />
        <Route path='/profile' component={Profile} />
        <Route  path='/userprofile' component={UserProfile} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/graphlike' component={GraphLikes} />
        <Route path='/graphre' component={GraphRe} />
        <Route path='/barday' component={Barday} />
        <Route  path='/usertweets' component={UserTweets} />
        <Route path='/tweets' component={SearchProfileTweets} />
        <Route path='/likes' component={SearchProfileTweets} />
        <Route  path='/userlikes' component={UserLikes} />
        <Route path='/followers' component={Followers} />
        <Route path='/following' component={Following} />
        <Route path='/bookmarks' component={BookMarkedTweets} />
        <Route path='/lists' component={Lists} />
        <Route path='/listdetails' component={ListDetails} />
        <Route path='/subscribedlist' component={SubscribedList} />
        <Route path='/userlists' component={UserLists} />
        <Route path='/usersubscribedlist' component={UserSubscribedLists} /> 
            
       
        <Route static path='/viewtweet/:id' component={ViewTweet} />
        <Route  path='/userretweets' component={UserRetweets} />
      </div>
    )
  }
}
// Export The Main Component
export default Main
