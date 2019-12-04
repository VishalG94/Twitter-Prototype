import React, { Component } from 'react'
// import '../../App.css'
// import './Messages.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { getProfile } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import Tweet from '../Tweet/Tweet'
import sampleImg from '../img/GrubhubDetails.jpg'
import MessageSearchBar from '../MessagesSearchBar/MessagesSearchBar'
import ROOT_URL from '../../constants'
import RecieverMessage from './RecieverMessage'
import SenderMessage from './SenderMessage'
import ActiveChat from '../MessagesSearchBar/ActiveChat'
import DisabledChat from '../MessagesSearchBar/DisabledChat'
// Define a Login Component
class Messages extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      following: [],
      followedby: [],
      recievers: [],
      uniqueMessagesList: [],
      senders: [],
      fullList: [],
      recieverName: 'New Message',
      messagelist: [],
      authFlag: false,
      authFailed: false
    }
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
    let email = sessionStorage.getItem('email');
    let data1 = { email: email }
    this.props.getProfile({ params: data1 }, (response) => {
      console.log('Response user' + response.data)
      sessionStorage.setItem('userDtls', JSON.stringify(response.data))
    });


    let user = JSON.parse(sessionStorage.getItem('userDtls'))
    let sender = JSON.parse(sessionStorage.getItem('userDtls')).username
    let reciever = sessionStorage.getItem('reciever')
    let data = {
      sender_name: sender,
      receiver_name: reciever
    }
    // sessionStorage.setItem('following', ['samkit', 'abc143', 'arunb1620'])
    // sessionStorage.setItem('followedby', ['kiranbijjala94', 'abc143', 'samkit'])

    let followingArray = (user.following).map((item) => { return item["username"]; });
    this.setState({ following: followingArray })
    let followedbyArray = (user.followedBy).map((list) => { return list.username; });
    this.setState({ followedby: followedbyArray })

    if (sessionStorage.getItem('reciever') !== null) {
      let temp = sessionStorage.getItem('reciever');
      this.setState({ 'recieverName': temp })
    } else {
      this.setState({ 'recieverName': 'New Message' })
    }

    // axios
    //   .get(`${ROOT_URL}/messagedetails`, data)
    //   .then(res => {
    //     // update the state with the response data
    //     console.log('Axios get:', res.data)
    //     if (res.status === 200) {
    //       console.log('Inside response', res.data)
    //       window.location.reload()
    //     } else {
    //       console.log('Error occured while sending the message!')
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Error occured while sending the message!' + err)
    //   })

    axios
      .post(`${ROOT_URL}/messagedetails`, data)
      .then(res => {
        // update the state with the response data
        let list = res.data
        console.log('Axios get:', (res.data))
        this.setState(
          {
            messagelist: list
          })
        if (res.status === 200) {
          console.log('Inside response', res.data)
          // window.location.reload()
        } else {
          console.log('Error occured while sending the message!')
        }
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })

    axios
      .post(`${ROOT_URL}/receivermessageslist`, data)
      .then(res => {
        // update the state with the response data
        let list = res.data
        console.log('Axios get reciever list:', (res.data))
        let y = [...this.state.fullList, ...res.data]
        // alert(y)
        this.setState({ fullList: y }, () => {
          let unique = [...new Set(this.state.fullList)];
          this.setState({ uniqueMessagesList: unique })
        })
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })

    axios
      .post(`${ROOT_URL}/sendermessageslist`, data)
      .then(res => {
        // update the state with the response data
        let list = res.data
        console.log('Axios get sender list:', (res.data))
        let x = [...this.state.fullList, ...res.data]
        // alert(y)
        this.setState({ fullList: x }, () => {
          let unique = [...new Set(this.state.fullList)];
          this.setState({ uniqueMessagesList: unique }
            // , () => { alert(this.state.uniqueMessagesList) }
          )
        })
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })
    // allMessagers = [...senders, ...recievers]

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

  renderInput = ({ input, type, meta }) => {
    return (
      <div>
        <input class='messageTerm' type={type} {...input} />
        {this.renderError(meta)}
      </div>
    )
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = formValues => {
    let reciever = sessionStorage.getItem('reciever')
    // let email = sessionStorage.getItem('email')
    if (formValues.mesg !== '' && typeof formValues.mesg !== 'undefined') {
      let user = JSON.parse(sessionStorage.getItem('userDtls'))
      let sender = user.username

      let data = {
        sender_name: sender,
        receiver_name: reciever,
        text: formValues.mesg
      }
      axios.defaults.withCredentials = true
      console.log(data)
      axios
        .post(`${ROOT_URL}/postmessage`, data)
        .then(res => {
          // update the state with the response data
          console.log('Axios get:', res.data)
          if (res.status === 200) {
            console.log('Inside response', res.data)
            window.location.reload()
          } else {
            console.log('Error occured while sending the message!')
          }
        })
        .catch(err => {
          console.log('Error occured while sending the message!' + err)
        })
    }
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

  renderInput = ({ input, meta, placeholder, className = { className } }) => {
    return (
      <div>
        <input
          id='messagebar'
          type='text'
          class='messageTerm'
          placeholder={placeholder}
          // style={{ marginRight: '10px' }}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  render() {
    let redirectVar = null
    let invalidtag = null
    let messageDisplay = null
    let messagesList = null

    let searchlist = null;
    let dispalyList = null;
    let recieverMsg = null;
    if (sessionStorage.getItem('reciever')) {

      recieverMsg = (<button
        id='messagebarbutton'
        type='submit'
        class='messageButton'
      >
        <i class='far fa-paper-plane ' />
      </button>)
    } else {
      recieverMsg = (<button
        id='messagebarbutton'
        type='submit'
        class='messageButton'
        disabled>
        <i class='far fa-paper-plane ' />
      </button>)
    }

    searchlist = JSON.parse(sessionStorage.getItem('messagesearchresult'));
    // let following = sessionStorage.getItem('following')
    // let followedby = sessionStorage.getItem('followedby')
    let previousChat = this.state.uniqueMessagesList;
    let previousChatList = null;
    let sendMessage = null;
    if (sessionStorage.getItem('reciever')) {
      sendMessage = (<button
        id='messagebarbutton'
        type='submit'
        class='messageButton'
      >
        <i class='far fa-paper-plane ' />
      </button>)
    } else {
      sendMessage = (<button
        id='messagebarbutton'
        type='submit'
        class='messageButton'
        disabled
      >
        <i class='far fa-paper-plane ' />
      </button>)
    }

    if (previousChat !== null) {
      previousChatList = Object.keys(previousChat).map((person) => {
        return (
          <ActiveChat person={previousChat[person]}></ActiveChat>
        )
      })
    }

    let user = JSON.parse(sessionStorage.getItem('userDtls'))
    if (searchlist !== null) {

      messagesList = Object.keys(searchlist).map((person) => {

        if (user.following.includes(searchlist[person]._id) && user.followedBy.includes(searchlist[person]._id)) {
          return (
            <ActiveChat person={searchlist[person].username}></ActiveChat>
          )
        } else {
          return (
            <DisabledChat person={searchlist[person].username}></DisabledChat>
          )
        }
      })
    }

    if (this.state.messagelist) {
      let mesgs = this.state.messagelist
      messageDisplay = Object.keys(mesgs).map((msg) => {
        let user = JSON.parse(sessionStorage.getItem('userDtls'))
        if (user.username === mesgs[msg].sender_name) {
          return (
            <SenderMessage message={mesgs[msg].text}></SenderMessage>
          )
        } else if (user.username === mesgs[msg].receiver_name) {
          return (
            <RecieverMessage message={mesgs[msg].text} ></RecieverMessage >
          )
        } else {
          alert('Nothing found')
        }
      })
    }
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
    // let recieverName = null
    // this.setState({'recieverName' , (typeof sessionStorage.getItem('reciever') === 'undefined' ? sessionStorage.getItem('reciever') : "New Message"})
    // alert(recieverName)
    // alert(this.state.recieverName)

    if (sessionStorage.getItem('messagesearchresult')) {
      dispalyList = messagesList
    } else {
      dispalyList = previousChatList
    }

    return (
      <div>
        <div>
          <div class='col-sm-2'>
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
            <MessageSearchBar />
            <div>
              <div class="list-group">
                {dispalyList}
              </div>
            </div>
          </div>
          <div class='split-right'>
            <h3
              style={{
                marginLeft: '20px',
                fontWeight: '800',
                fontSize: '19px',
                color: 'black'
              }}
            >

              {this.state.recieverName}
            </h3>
            <div style={{ borderBottom: '1px solid #E0E0E0' }} />
            <div class="wrapper">
              <div class="content">
                {messageDisplay}

                {/* <RecieverMessage message='Reciever'></RecieverMessage>
                <RecieverMessage message='Reciever'></RecieverMessage>
                <RecieverMessage message='Reciever'></RecieverMessage>
                <SenderMessage message='Sender'></SenderMessage> */}
              </div>
            </div>


            <div
              style={{
                position: 'absolute',
                bottom: '50px',
                width: '100%',
                borderTop: '1px solid #E0E0E0'
              }}
            >
              <div>
                <form
                  className='ui form error'
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div class='row'>
                    <div class='col-sm-11'>
                      <div class='message'>
                        <Field
                          name='mesg'
                          placeholder='Start a new message'
                          component={this.renderInput}
                        />
                        {/* <input
                          id='messagebar'
                          type='text'
                          class='messageTerm'
                          placeholder='Start a new message'
                        /> */}
                      </div>
                    </div>

                    <div class='col-sm-1'>
                      {/* <button
                        id='messagebarbutton'
                        type='submit'
                        class='messageButton'
                      >
                        <i class='far fa-paper-plane ' />
                      </button> */}
                      {sendMessage}
                    </div>
                  </div>
                </form>
                <div class='form-group'>
                  <div tabIndex='0' class='wrap' />
                </div>
              </div>
            </div>
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
  { loginuser, getProfile }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(Messages)
)
