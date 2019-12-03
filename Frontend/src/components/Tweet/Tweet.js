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
