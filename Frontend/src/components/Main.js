import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import Navbar from './LandingPage/Navbar'
// import BuyerProfile from './BuyerProfile/BuyerProfile';
import Search from './Search/Search'

// Create a Main Component
class Main extends Component {
  render () {
    return (
      <div>
        <Route path='/' component={Navbar} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={Search} />
        <Route path='/signup' component={SignUp} />
      </div>
    )
  }
}
// Export The Main Component
export default Main
