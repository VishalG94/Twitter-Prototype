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
import UserTweets from './UserTweets/UserTweets'
import UserLikes from './UserTweets/UserLikes'
// Create a Main Component
class Main extends Component {
  render () {
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
        <Route static path='/userprofile' component={UserProfile} />
        <Route path='/dashboard' component={Dashboard} />
        <Route static path='/userprofile/tweets' component={UserTweets} />
        <Route static path='/userprofile/likes' component={UserLikes} />
      </div>
    )
  }
}
// Export The Main Component
export default Main
