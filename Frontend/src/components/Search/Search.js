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
import UserList from './UserList'
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

  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
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

        const user = jwtDecode(res.data.token)
        console.log(user)
        sessionStorage.setItem('email', user.email)

        const cookies = new Cookies()
        cookies.set('cookie', res.data.token, {
          maxAge: 900000,
          httpOnly: false,
          path: '/'
        })
        console.log(cookies.get('myCat'))

        this.props.history.push('/home')
      } else {
        alert('Please enter valid credentials')
      }
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let redirectVar = null
    let invalidtag = null
    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    let data = {
      name: 'Vishal',
      handler: 'Handler',
      time: 'time',
      description: 'Description',
      img: sampleImg,
      likes: 30,
      retweets: 20,
      comments: 10
    }

    let isSelected = 'searchTerm'
    let tweetList = null;
    let UsersList = null;
    tweetList = JSON.parse(sessionStorage.getItem('Result'))
    UsersList = JSON.parse(sessionStorage.getItem('UserResult'))
    let list = null;
    if (tweetList) {
      list = <Tweet tweetsDtls={tweetList} />
    } else if (UsersList) {
      list = Object.keys(UsersList).map((person) => {
        return (
          <UserList person={UsersList[person]}></UserList>
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
                {list}
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
