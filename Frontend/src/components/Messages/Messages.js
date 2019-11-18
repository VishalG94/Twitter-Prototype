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
          <div className='row'>
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
                  <div class='form-group'>
                    <div tabIndex='0' class='wrap'>
                      <div class='search'>
                        <input
                          id='searchbar'
                          type='text'
                          class='searchTerm'
                          placeholder='What are you looking for?'
                        />
                        <button
                          id='searchbarbutton'
                          type='submit'
                          class='searchButton'
                        >
                          <i class='fa fa-search' />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className='col-sm-6'>
              <Tweet tweetsDtls={data} />
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
  })(Search)
)
