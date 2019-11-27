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
  }

  // componentDidMount() {
  //   var email = sessionStorage.getItem("email")
  //   axios.get(ROOT_URL + '/fetchtweets', {
  //     params: {
  //       email: email
  //     }
  //   })
  //     .then((response) => {
  //       console.log("Received response")
  //       console.log(response)
  //       //update the state with the response data
  //       this.setState({

  //         tweets: this.state.tweets.concat(response.data)
  //       });
  //     });
  // }

  // let Tweet = props => {


  render() {

    let details = this.props.tweetsDtls.map(tweet => {
      return (
        <div>
          <TweetData key={Math.random} data={tweet}></TweetData>
        </div>
      )
    })

    return (
      <Fragment>
        {details}
      </Fragment>
    )
  }
}

export default Tweet
