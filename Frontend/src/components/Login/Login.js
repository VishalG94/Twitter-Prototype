import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginuser, getProfile } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

// Define a Login Component
class Login extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false
    }

  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount() {
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
        let userp = {
          email: "arunb1620@gmail.com",
          id: "5dda82c83325fc2eb7be3d12"
        }
        const user = jwtDecode(res.data.token)
        console.log(user)
        let data = { email: user.email }
        // alert(data.email)
        this.props.getProfile({ params: data }, (response) => {
          // console.log(this.props.user)
          // alert(response.data);
          sessionStorage.setItem('userDtls', JSON.stringify(response.data))
        });
        sessionStorage.setItem('email', user.email)

        sessionStorage.setItem('id', res.data.id)
        sessionStorage.setItem('first_name', res.data.first_name)
        sessionStorage.setItem('last_name', res.data.last_name)

        sessionStorage.setItem('user_email', userp.email)
        sessionStorage.setItem('result', userp.id)
        window.location.replace('/home')
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
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }
    let redirecthome = null
    if (this.state.authFlag) {
      redirecthome = <Redirect to='/home' />
    }
    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    return (
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div>
          {redirectVar}
          {redirecthome}
          <div class='container'>
            <div class='login-form'>
              <div class='main-div'>
                <div class='panel'>
                  <h2>Sign in with your Twitter account</h2>
                  {invalidtag}
                </div>
                <Field
                  name='email'
                  type='text'
                  component={this.renderInput}
                  label='Email'
                />
                <br />
                <Field
                  name='password'
                  type='password'
                  component={this.renderInput}
                  label='Password'
                />
                <br />
                <button type='submit' class='btn btn-info'>
                  Login
                </button>
                <br />
                <div style={{ textAlign: 'center' }} class='form-group'>
                  <span>New to Twitter? </span><Link to='/signup'>Sign up now >></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
  { loginuser, getProfile }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(Login)
)
