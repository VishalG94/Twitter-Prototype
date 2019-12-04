import React, { Component } from 'react'
import '../../App.css'
import './UserLists.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import WriteTweet from '../WriteTweet/WriteTweet'
import Tweet from '../Tweet/Tweet'
import sampleImg from '../img/GrubhubDetails.jpg'
import {NavLink} from 'react-router-dom';
import UserListNavbar from '../ListNavbar/UserListNavbar'
import List from '../Lists/List'
import CreateList from '../Lists/CreateList'
import UserSubscribedList from './UserSubscribedList'


class UserSubscribedLists extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false
    }
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }  

  render() {   

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

    return (
      <div>
        <div>
          <div class='col-sm-2'>
            <LeftNavbar />
          </div>

          <div class='split-center-list'>
          <ul> 
                <span>
                Lists
                <br/>
                </span>
              
              @{data.handler}
              <br/> 

               <UserListNavbar/> 

               <UserSubscribedList data={sessionStorage.getItem('username')} />               
                
              </ul>
            </div>
           
           
          
        </div>
      </div >

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
  })(UserSubscribedLists)
)
