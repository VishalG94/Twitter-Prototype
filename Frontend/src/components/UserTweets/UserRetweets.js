import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
import Tweet from '../Tweet/Tweet'
import './UserTweets.css'
import UserProfile from '../Profile/UserProfile';
import LeftNavbar from '../LeftNavbar/LeftNavbar'
class UserRetweets extends Component {

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
        axios.get(ROOT_URL + '/fetchuserretweets', {
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

            <div>
                <div className='col-sm-2'>
                    <LeftNavbar />
                </div>
                <div class='split-center_retweets'>
                    <Tweet tweetsDtls={this.state.tweets}></Tweet>
                    </div>

                    </div>

                    )
                  }
                }
                
export default UserRetweets