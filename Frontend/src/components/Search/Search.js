import React, { Component } from 'react'
import '../../App.css'
import './Search.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
//import Tweet from '../Tweet/Tweet'
import sampleImg from '../img/GrubhubDetails.jpg'
import SearchBar from '../SearchBar/SearchBar'
import TweetData from '../Tweet/TweetData'

// Define a Login Component
class Search extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      tweets: JSON.parse(sessionStorage.getItem("Result")),
      user : JSON.parse(sessionStorage.getItem("UserResult"))
    }
    // console.log(this.state.tweets)
    // console.log(this.state.user)

    this.userClick = this.userClick.bind(this)
  }
  
  userClick = (info) => {
    console.log(info)
    sessionStorage.setItem("UserRedirect", JSON.stringify(info))
}

  render() {

    let details = null
    if (this.state.tweets) {
       details = this.state.tweets.map(tweet => {
        return (
          <div>
            <TweetData key={Math.random} data={tweet}></TweetData>
          </div>
        )
      })
    }

    let details2 = null
    if (this.state.user) {
       details = this.state.user.map(u => {
        return (
          <div>
       <a href="#" style={{ fontSize: '15.4px', fontWeight: '700', color: 'black', borderRight: 'none', borderRadius: '0px 0px 0px 0px ', borderLeft: 'none' }} class="list-group-item list-group-item-action" id={Math.random} onClick={(e) =>{this.userClick(u)}}>@{u.username}</a>
          </div>
        )
      })
    }

    return (
      <div>
        <div>
          <div className='row'>
            <div className='col-sm-2'>
              <LeftNavbar />
            </div>
            <div className='col-sm-7'>
              <ul>
                <li href='#' class='list-group-item'>
                  <SearchBar />
                </li>   
                {details}
                {details2}
                {/* <Tweet tweetsDtls={JSON.parse(sessionStorage.getItem("Result"))} /> */}
                {/* <TweetData key={Math.random} data={sessionStorage.getItem("Result")}></TweetData> */}
              </ul>
            </div>
            <div className='col-sm-1' />
          </div>
        </div>
      </div>
    )
  }
}

const validate = formValues => {
  const error = {}
  if (!formValues.email) {
    error.email = 'Enter a valid email'
  }
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  return error
}
const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { loginuser }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(Search)
)
