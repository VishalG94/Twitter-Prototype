import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
import TweetData from './TweetData'

class Tweet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      replyToggle: false
    }

    this.likePressed = this.likePressed.bind(this);
    this.replyPressed = this.replyPressed.bind(this);
    this.retweetPressed = this.retweetPressed.bind(this);
  }


  likePressed = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/buyersignup", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        window.location.replace("/login");
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };


  replyPressed(e) {
    console.log("replyPressed")
    this.setState({
      replyToggle: true
    })
  }

  retweetPressed(e) {
    console.log("retweetPressed")
  }

  componentDidMount() {
    var email = sessionStorage.getItem("email")
    console.log(email);
    axios.get(ROOT_URL + '/fetchtweets', {
      params: {
        email: email
      }
    })
      .then((response) => {
        console.log("Received response")
        console.log(response)
        //update the state with the response data
        this.setState({

          tweets: this.state.tweets.concat(response.data)
        });
        console.log(this.state.tweets)
      });
  }

  // let Tweet = props => {


  render() {
    // let replyBar = "";

    // if (this.state.replyToggle) {
    //   replyBar = (
    //     <div>
    //       <WriteTweet />
    //     </div>
    //   )
    // }



    let details = this.state.tweets.map(tweet => {
      return (
        <div>
          <TweetData key={Math.random} data={tweet}></TweetData>
        </div>
      )
    })


    let details1 = this.state.tweets.map(tweet => {
      return (
        <div>
          <h1>inside Tweet</h1>
          
        <TweetData key={Math.random} data={tweet}></TweetData>
        </div>
        
        // let hasImageTag = null
        // if (tweet.image) {
        //   hasImageTag = (
        //     <div>
        //       <img
        //         class='rounded-circle'
        //         style={{ borderRadius: '10px' }}
        //         src={tweet.image}
        //         width='500px'
        //         height='250%'
        //         alt='profile pic'Tweet
        //       />
        //       <br />
        //       <br />
        //     </div>
        //   )
        // }
      )
    })



    return (
      
      <Fragment>

        {details}
        {/* {replyBar} */}

      </Fragment>

    )
  }
}

export default Tweet
