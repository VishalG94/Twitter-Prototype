import React, { Component } from 'react'
import '../../App.css'
import './Messages.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import Tweet from '../Tweet/Tweet'
import sampleImg from '../img/GrubhubDetails.jpg'
import SearchBar from '../SearchBar/SearchBar'
// Define a Login Component
class Search extends Component {
  // call the constructor method
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false
    }
  }

  componentWillMount () {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )
    }
  }

  renderInput = ({ input, type, label, meta }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}
        </div>
        <div class='form-group'>
          <input class='form-control' type={type} {...input} />
          {this.renderError(meta)}
        </div>
      </div>
    )
  }

  onSubmit = formValues => {
    console.log('OnSubmit' + formValues)
    let data = {
      email: formValues.email,
      password: formValues.password
    }
    axios.defaults.withCredentials = true

    this.props.loginuser(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data)
        this.setState({
          authFlag: true
        })

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

  render () {
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

    return (
      <div>
        <div>
          <div class='split-left'>
            <LeftNavbar />
          </div>

          <div class='split-center'>
            <h3
              style={{
                marginLeft: '20px',
                fontWeight: '800',
                fontSize: '19px'
              }}
            >
              Messages
            </h3>
            <div style={{ borderBottom: '1px solid #E0E0E0' }} />
            <SearchBar />
            {/* <ul
              style={{
                width: '90%',
                float: 'left',
                witdth: '50px'
              }}
            >
              <li
                href='#'
                style={{ fontWeight: '800', fontSize: '19px' }}
                class='list-group-item'
              >
                Messages
              </li>
              <li href='#' class='list-group-item'>

              </li>
            </ul> */}
          </div>

          <div class='split-right'>
            <h3
              style={{
                marginLeft: '20px',
                fontWeight: '800',
                fontSize: '19px'
              }}
            >
              @ Samkit Sheth
            </h3>

            <div style={{ borderBottom: '1px solid #E0E0E0' }} />
          </div>
          {/* <div className='row'>
            <div className='col-sm-2'>
              <LeftNavbar />
            </div>
            <div className='col-sm-3'>
              <ul>
                <li
                  href='#'
                  style={{ fontWeight: '800', fontSize: '19px' }}
                  class='list-group-item'
                >
                  Messages
                </li>
                <li href='#' class='list-group-item'>
                  <SearchBar />
                </li>
              </ul>
            </div>
            <div className='col-sm-6'>
              <Tweet tweetsDtls={data} />
            </div>
          </div> */}
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
