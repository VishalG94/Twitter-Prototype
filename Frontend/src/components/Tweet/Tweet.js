import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
// import TweetData from './TweetData'
import TweetData1 from './TweetData1'

class Tweet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      replyToggle: false
    }
  }

  render() {
    console.log("in tweet compo" + typeof (this.props.tweetsDtls) + this.props.tweetsDtls)
    let details = this.props.tweetsDtls.map(tweet => {
      return (
        <div>
          <TweetData1 key={Math.random} data={tweet}></TweetData1>
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
