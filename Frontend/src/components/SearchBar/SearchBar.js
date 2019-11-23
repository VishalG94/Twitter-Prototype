import React, { Component } from 'react'
import '../../App.css'
import './SearchBar.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

// Define a Login Component
class SearchBar extends Component {
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
      axios.post('http://localhost:3001/searchbar', data)
        .then(response => {
            console.log(response.data)            
        }).catch((error) => {
          console.log("Gandu kuch hua jol yaha!")
        });
    }
 




  render() {
    return (
      <div>
        <div class='form-group'>
          <div tabIndex='0' class='wrap'>
            <div class='search'>
              <input
                id='searchbar'
                type='text'
                class='searchTerm'
                placeholder='What are you looking for?'
                onChange={this.textChangeHandler}
              />
              <button id='searchbarbutton' type='submit' class='searchButton' onClick={this.submitSearch} >
                <i class='fa fa-search' />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
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
  })(SearchBar)
)
