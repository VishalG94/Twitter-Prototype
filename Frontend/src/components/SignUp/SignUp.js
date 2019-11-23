import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { signupUser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

// Define a SignUp Component
class SignUp extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      username: '',
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

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
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

  renderInput = ({ input, label, meta, type }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}
        </div>
        <input class='form-control' type={type} {...input} />
        {this.renderError(meta)}
      </div>
    )
  }
  onSubmit = formValues => {
    console.log('OnSubmit' + formValues)

    let data = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      username : formValues.username,
      password: formValues.password
    }
    axios.defaults.withCredentials = true
    this.props.signupUser(data, res => {
      if (res.status === 200) {
        console.log('Response signup user: ', res.data)
        this.props.history.push('/login')
      } else {
        console.log('Failed')
        this.setState({ authFailed: true })
      }
    })
  }

  render () {
    let redirectVar = null
    let invalidtag = null
    if (cookie.load('cookie')) {
      redirectVar = <Redirect to='/home' />
    }

    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>
          *Error occured while signing up please provide valid details!
        </label>
      )
    }

    return (
      <form
        className='ui form error'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div>
          {redirectVar}
          <div class='container'>
            <div class='login-form'>
              <div class='main-div'>
                <div class='panel'>
                  <h2>Create your account</h2>
                  {invalidtag}
                </div>
                <div class='form-group'>
                  <div class='row'>
                    <div class='col-sm-6'>
                      <Field
                        name='firstname'
                        type='text'
                        component={this.renderInput}
                        label='First name'
                      />
                    </div>
                    <div class='col-sm-6'>
                      <Field
                        name='lastname'
                        type='text'
                        component={this.renderInput}
                        label='Last name'
                      />
                    </div>
                  </div>
                </div>
                <div class='form-group'>
                  <Field
                    name='email'
                    type='email'
                    component={this.renderInput}
                    label='Email'
                  />
                  <br />
                </div>

                <div class='form-group'>
                  <Field
                    name='username'
                    type='text'
                    component={this.renderInput}
                    label='Username'
                  />
                  <br />
                </div>
                
                <div class='form-group'>
                  <Field
                    name='password'
                    type='password'
                    component={this.renderInput}
                    label='Password (8 character minimum)'
                  />
                </div>
                <div class='form-group'>
                  <div class='form-check'>
                    <input
                      class='form-check-input'
                      type='checkbox'
                      id='gridCheck'
                    />
                    <label
                      style={{
                        color: '#6b6b83',
                        margin: '5px',
                        fontWeight: 'normal'
                      }}
                      class='form-check-label'
                      for='gridCheck'
                    >
                      Keep me signed in
                    </label>
                  </div>
                </div>

                <div class='form-group'>
                  <button type='submit' class='btn btn-warning'>
                    Create an account
                  </button>
                </div>
                <div class='form-group'>
                  <div style={{ textAlign: 'center' }}>or</div>
                </div>
                <div class='form-group'>
                  <button class='btn btn-secondary'>
                    Continue with Facebook
                  </button>
                </div>

                <div class='form-group'>
                  <button class='btn btn-info'>Continue with Google</button>
                </div>

                <div style={{ textAlign: 'center' }} class='form-group'>
                  Have an account? <Link to='/login'>Sign in</Link>
                </div>

                <div
                  style={{ fontSize: '12px', textAlign: 'center' }}
                  class='form-group'
                >
                  By creating your Grubhub account, you agree to the{' '}
                  <span style={{ color: '#0070eb' }}>Terms of Use</span> and{' '}
                  <span style={{ color: '#0070eb' }}> Privacy Policy.</span>
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
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  if (!formValues.username) {
    error.username = 'Enter a valid Username'
  }
  if (!formValues.lastname) {
    error.lastname = 'Enter a valid last name'
  }
  return error
}
const mapStoreToProps = state => {
  return { user: state.user }
}
export default connect(
  mapStoreToProps,
  { signupUser: signupUser }
)(
  reduxForm({
    form: 'streamSignup',
    validate: validate
  })(SignUp)
)
