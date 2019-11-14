import React, { Component } from 'react'
import '../../App.css'
import './Search.css'
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
    // console.log(data)
    // axios
    //   .post('http://localhost:3001/login', data)
    //   .then(response => {
    //     console.log('Status Code : ', response.status)
    //     if (response.status === 200) {
    //       sessionStorage.setItem('email', data.email)
    //       this.setState({
    //         authFlag: true
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({ authFailed: true })
    //   })
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
    // console.log(this.props.user)
    // redirect based on successful login
    // console.log(this.props)

    // renderInput(formProps){
    //   return (<input onChange={...formProps.input.onChange} value={...formProps.input.value} />)
    // }

    let redirectVar = null
    let invalidtag = null
    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }
    // let redirecthome = null
    // if (this.state.authFlag) {
    //   redirecthome = <Redirect to='/home' />
    // }
    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    return (
      // <div class='container'>
      <div>
        <div class='login-form'>
          <form
            className='ui form error'
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <div>
              <div className='row'>
                <div className='col-sm-2'>
                  <LeftNavbar />
                </div>
                <div className='col-sm-7'>
                  <ul>
                    <a
                      href='#'
                      style={{ marginTop: '20px' }}
                      class='list-group-item'
                    >
                      <div class='row'>
                        <div class='col-sm-1'>
                          <img
                            src={require('../img/Twitternew.png')}
                            class='preview-img'
                            width='50'
                            height='50'
                            alt='profile pic'
                          />
                        </div>
                        <div class='col-sm-11'>
                          <div class='row'>
                            <div class='col-sm-6'>
                              <h4 class='user-name'>
                                User Name{' '}
                                <span
                                  style={{
                                    fontWeight: 'normal',
                                    color: 'grey'
                                  }}
                                >
                                  @Twitter-Handler
                                </span>
                                <span />
                                <span
                                  style={{
                                    fontWeight: 'normal',
                                    color: 'grey'
                                  }}
                                >
                                  . Time
                                </span>
                              </h4>
                              <div style={{ color: 'black' }}>Description</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href='#' class='list-group-item'>
                      <div class='row'>
                        <div class='col-sm-1'>
                          <img
                            src={require('../img/Twitternew.png')}
                            class='preview-img'
                            width='50'
                            height='50'
                            alt='profile pic'
                          />
                        </div>
                        <div class='col-sm-11'>
                          <h4 class='user-name'>
                            User Name{' '}
                            <span
                              style={{
                                fontWeight: 'normal',
                                color: 'grey'
                              }}
                            >
                              @Twitter-Handler
                            </span>
                            <span />
                            <span
                              style={{
                                fontWeight: 'normal',
                                color: 'grey'
                              }}
                            >
                              . Time
                            </span>
                          </h4>
                          <div style={{ color: 'black' }}>Description</div>
                          <br />
                          <img
                            class='rounded-circle'
                            style={{ borderRadius: '10px' }}
                            src={require('../img/GrubhubDetails.jpg')}
                            width='500px'
                            height='250%'
                            alt='profile pic'
                          />
                          <br />
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class='far fa-comment fa-2x' />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class='fas fa-retweet fa-2x' />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class='far fa-heart fa-2x' />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i class='fas fa-arrow-up fa-2x' />
                        </div>
                      </div>
                    </a>
                  </ul>
                </div>
                <div className='col-sm-1' />
              </div>

              <div style={{ textAlign: 'center' }} class='form-group'>
                <span>New to Twitter? </span>
                <Link to='/signup'>Sign up now >></Link>
              </div>
            </div>
          </form>
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
