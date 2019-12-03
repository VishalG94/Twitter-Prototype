import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
import Tweet from '../Tweet/Tweet'
import './UserTweets.css'
import UserProfile from '../Profile/UserProfile';

class UserLikes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      replyToggle: false
    }

  }


  componentWillMount() {
    var email = sessionStorage.getItem("email")
    console.log(email);
    axios.get(ROOT_URL + '/fetchuserlikes', {
      params: {
        email: email
      }
    })
      .then((response) => {
        console.log("Received response")
        console.log(response.data)
        //update the state with the response data
        this.setState({
          
          tweets: this.state.tweets.concat(response.data)
        });
        console.log(this.state.tweets)
      });
  }



  render() {  
    return (
        
        //   <div class='split-center_newdata'>
        //   <div style={{
        //     marginLeft: '20px',
        //     marginBottom : '500px',
        //     fontWeight: '800',
        //     fontSize: '19px'
        // }}></div>
        // <Tweet tweetsDtls = {this.state.tweets}></Tweet>
        
        // </div>

        <div>
       {/* <div className='col-sm-7'>  */}
        <Tweet tweetsDtls = {this.state.tweets}></Tweet>
        </div>
    
    )
  }
}

export default UserLikes