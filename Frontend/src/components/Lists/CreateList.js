import React, { Component } from 'react'

import './CreateList.css'
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
import ListSearchBar from './ListSearchbar'
import MessagesSearchBar from '../MessagesSearchBar/MessagesSearchBar'
import ListSearchbar from './ListSearchbar'
import ROOT_URL from '../../constants'



class CreateList extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false,
      
    }

    this.submit = this.submit.bind(this);

  }

  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }

  
  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit(e){

    e.preventDefault();
    const data = {
      name:e.target.name.value,
      description:e.target.description.value,
      members: (sessionStorage.getItem('members')),
      email:sessionStorage.getItem('email')
    }
    console.log("Inside Submit of Create List")
    axios.defaults.withCredentials = true;
    if(data.members){
      axios.post(`${ROOT_URL}/createlists`, data)
      .then(response => {
        console.log(response.data)
        window.location.reload();        
      }).catch((error) => {
        console.log("Error while creating list!")    
        throw error;            
      });
    }
    
  }



  render() {    
    
    return (
      <div>
          <label id="header">Create List</label>

          <form onSubmit={this.submit}>
              
              <div>
              <label id="label-name">Name</label> <br/><br/>
              <input type="text" id="name" class="form-control" required placeholder="Enter name of list" />    
              </div>

              <div>
              <label id="label-description">Description</label> <br/><br/>
              <input type="text" id="description" class="form-control" placeholder="Description" />    
              </div>  

            <div class='searchbar-list'>

            <ListSearchbar/>                 
           
        </div>

            <div class="createlist">
            <button type="submit" class="btn btn-primary btn-sm"  >Create List</button>
            </div>                      
              
          </form>          
          
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
  })(CreateList)
)
