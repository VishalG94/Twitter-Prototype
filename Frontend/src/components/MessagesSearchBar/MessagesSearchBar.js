import React, { Component } from 'react'
import '../../App.css'
// import './SearchBar.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ROOT_URL from '../../constants'

// Define a Login Component
class MessagesSearchBar extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      text: ""
    }

    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitSearch = this.submitSearch.bind(this);
  }

  textChangeHandler = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  submitSearch = (e) => {
    e.preventDefault();
    const data = {
      text: this.state.text
    }
    axios.defaults.withCredentials = true;

    axios.post(`${ROOT_URL}/messagessearchbar`, data)
      .then(response => {
        console.log(response.data)
        sessionStorage.setItem('messagesearchresult', JSON.stringify(response.data))
        window.location.reload();
      }).catch((error) => {
        console.log("No records found!")
        console.log("Error encountered!")
      });
  }

  clearsearchlist = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('messagesearchresult');
    window.location.reload();
  }

  render() {
    let Searchbutton = null;
    if (sessionStorage.getItem('messagesearchresult') != null) {
      Searchbutton = <button id='searchbarbutton' style={{ outline: 'none' }} type='submit' class='searchButton' onClick={this.clearsearchlist} >
        <i class="fas fa-times-circle"></i>
      </button>
    } else {
      Searchbutton = <button id='searchbarbutton' style={{ outline: 'none' }} type='submit' class='searchButton' onClick={this.submitSearch} >
        <i class='fa fa-search' />
      </button>
    }
    return (
      <div>
        <div class='form-group'>
          <div tabIndex='0' class='wrap'>
            <div class='search'>
              <input
                id='searchbar'
                type='text'
                class='searchTerm'
                placeholder='Search for people'
                onChange={this.textChangeHandler}
              />
              {Searchbutton}
              {/* <button id='searchbarbutton' type='submit' class='searchButton' onClick={this.submitSearch} >
                <i class='fa fa-search' />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button class='btn btn-link' style={{ color: 'gray' }} onClick={this.clearsearchlist} >
                <i class="fas fa-times-circle"></i>
              </button> */}
            </div>
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
  })(MessagesSearchBar)
)
