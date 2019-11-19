import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
import SignUp from './SignUp/SignUp'
import Navbar from './LandingPage/Navbar'
import Messages from './Messages/Messages'
// import BuyerProfile from './BuyerProfile/BuyerProfile';
import Search from './Search/Search'

import PrivateRoute from '../lib/PrivateRoute'

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
      </div>
    )
  }
}
// Export The Main Component
export default Main
