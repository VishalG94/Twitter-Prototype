import React, { Component } from 'react'
import '../../App.css'
import './ListSearchBar.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { ReactModal } from 'react-modal';
import WriteTweet from '../WriteTweet/WriteTweet'
import Tweet from '../Tweet/Tweet'
import ROOT_URL from '../../constants'
import Suggestions from './Suggestions'

//ReactModal.defaultStyles.overlay.backgroundColor = 'cornsilk';

// Define a Login Component
class ListSearchBar extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      results: [],
      members:[],
      query:''
    }

    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitSearch = this.submitSearch.bind(this);
  }

 
  textChangeHandler = () => {
    this.setState({
      text: this.search.value
    }, () => {
      if (this.state.text && this.state.text.length >= 1) {
        if (this.state.text.length % 2 === 0) {
          this.submitSearch()
        }
      } else if (!this.state.query) {
      }
    })
  }



  submitSearch = (e) => {
   // e.preventDefault();
    const data = {
      text: this.state.text
    }
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/messagessearchbar`, data)
      .then(response => {
        console.log(response.data)

        // if (response.data[0].username) {
        //   this.setState({
        //     members : this.state.members.concat(response.data[0])
        //   })
        //   sessionStorage.setItem("Result", JSON.stringify(response.data[0]))
        // } else {
        //   sessionStorage.setItem("UserResult", JSON.stringify(response.data.res))
        // }

        this.setState({
          results: response.data
        })
        //window.location.reload()
      }).catch((error) => {
        console.log(error);
        console.log("Gandu kuch hua jol yaha!")
      });
  }

  render() {

    // if(sessionStorage.getItem('member'))
    // {
    //   this.setState({
    //     members: this.state.members.concat(sessionStorage.getItem('member'))
    //   })
    // }

    return (
      <div>
        <div class='form-group'>
          <div tabIndex='0' class='wrap'>
            <div class='search'>
              <input
                id='searchbar'
                type='text'
                class='searchTerm'
                ref={input => this.search = input}
                placeholder='Add members'
                onChange={this.textChangeHandler}
              />              
              <button id='searchbarbutton' type='submit' class='searchButton' onClick={this.submitSearch} >
                <i class='fa fa-search' />
              </button><br></br>
              <Suggestions results={this.state.results} />

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
  })(ListSearchBar)
)
