import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Tweet from './Tweet'
import ROOT_URL from "../../constants"
import ReplyTweet from "./ReplyTweet";
import RetweetTweet from "./RetweetTweet";
import dateformat from 'dateformat';
import { getProfile } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class TweetDataComp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            replyFlag: false,
            retweetFlag: false,
            pic: ''
        }

        this.likePressed = this.likePressed.bind(this)
        this.unlikePressed = this.unlikePressed.bind(this)
        this.bookmarkPressed = this.bookmarkPressed.bind(this)
        this.unbookmarkPressed = this.unbookmarkPressed.bind(this)
        this.retweetPressed = this.retweetPressed.bind(this)
        this.viewTweetCalled = this.viewTweetCalled.bind(this)
        this.deletePressed = this.deletePressed.bind(this)
    }

    componentWillMount() {
        let email = this.props.data.owner.email;

       
        let data = { email: email }
        
        this.props.getProfile({ params: data }, (response) => {
            
            let img = `${ROOT_URL}/images/profile/`

            // let img = '/images/profile/'
              if (response.data.image) {
                  img = img + response.data.image
              } else {
                  img = img + 'Twitternew.png'
              }
  
              this.setState({
                  pic: img
              });
  
          

        })

    }

    Search = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('SelectedProfileId')
        sessionStorage.removeItem('SelectedUserProfile')
        sessionStorage.setItem('SelectedUserProfileId', e.target.id)
        sessionStorage.setItem('SelectedUserProfile', e.target.name)

        let x = sessionStorage.getItem('email')
        let y = sessionStorage.getItem('SelectedUserProfile')
        if (x != y) {
          //  console.log(x);
            window.location.replace('/profile');
        }
        else {
            window.location.replace('/userprofile')
        }
    }

    likePressed = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            tweetid: this.props.data._id,
            email: sessionStorage.getItem("email"),
            flag: 0
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/hitlike", data).then(response => {
           // console.log("Status Code : ", response.status);
            if (response.status === 200) {

                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    bookmarkPressed = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            tweetid: this.props.data._id,
            email: sessionStorage.getItem("email"),
            flag: 0
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/hitbookmark", data).then(response => {
          //  console.log("Status Code : ", response.status);
            if (response.status === 200) {

                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    unbookmarkPressed = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            tweetid: this.props.data._id,
            email: sessionStorage.getItem("email"),
            flag: 1
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/hitbookmark", data).then(response => {
        //    console.log("Status Code : ", response.status);
            if (response.status === 200) {

                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    unlikePressed = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            tweetid: this.props.data._id,
            email: sessionStorage.getItem("email"),
            flag: 1
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/hitlike", data).then(response => {
          //  console.log("Status Code : ", response.status);
            if (response.status === 200) {

                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    replyPressed = e => {
      //  console.log("Reply pressed")
        this.setState({
            replyFlag: true
        })
    }

    retweetPressed = e => {
      //  console.log("Retweet pressed!!")
        this.setState({
            retweetFlag: true
        })
    }

    viewTweetCalled = e => {

        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            tweetid: this.props.data._id,
            views: this.props.data.views
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/increamentview", data).then(response => {
        //    console.log("Status Code : ", response.status);
            if (response.status === 200) {
                window.location.replace(`/viewtweet/` + this.props.data._id)
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


    deletePressed = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            tweetid: this.props.data._id,
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/deletetweet", data).then(response => {
         //   console.log("Status Code : ", response.status);
            if (response.status === 200) {

                this.setState({
                    authFlag: true
                });
                window.location.reload();
            } else {
                this.setState({
                    authFlag: false
                });
            }
        });
    };

    render() {
       // console.log("Views " + this.props.data.views)
        var dateVar = dateformat(this.props.data.time, 'mmm dd')
       // console.log(JSON.stringify(this.props.data.owner))
        let deleteFlag = null;
        if (this.props.data.owner._id === sessionStorage.getItem('id')) {
            deleteFlag =
                <button type="submit" class="btn btn-link" onClick={this.deletePressed} style={{ color: 'grey' }}>
                    <span class="glyphicon glyphicon-trash fa-2x"></span>
                </button>
        }

        let hasImageTag = null
        if (this.props.data.image && this.props.data.image !== "/uploads/") {
            hasImageTag = (
                <div style={{ marginLeft: '3%' }}>
                    <img
                        class='rounded-circle'
                        style={{ borderRadius: '10px' }}
                        src={this.props.data.image}
                        width='500px'
                        height='250%'
                        alt='profile pic' Tweet
                    />

                    <br />
                    <br />
                </div>
            )
        }

        let replyBar = null;
        if (this.state.replyFlag) {
           //console.log("Inside set reply flag")
            replyBar =
                <div>
                    <ReplyTweet data={this.props.data} />
                </div>
        }

        let retweetBar = null;
        if (this.state.retweetFlag) {
           // console.log("Inside set reply flag")
            retweetBar =
                <div>
                    <RetweetTweet data={this.props.data} />
                </div>
        }

        let id = sessionStorage.getItem('id')
        let likeFlag = false
      //  console.log("inside tweetdata" + this.props.data);
        for (let i = 0; i < this.props.data.likes.length; i++) {
            if (this.props.data.likes[i] == id) {
                //add object id retrieved from session storage
                //console.log("already liked")
                likeFlag = true;
                break;
            } else {
                //console.log("not liked yet")
            }
        }

        let bookmarkFlag = false
        for (let i = 0; i < this.props.data.bookmarks.length; i++) {
            if (this.props.data.bookmarks[i] == id) {
                //add object id retrieved from session storage
            //    console.log("already bookmarked")
                bookmarkFlag = true;
                break;
            } else {
             //   console.log("not bookmarked yet")
            }
        }

        let likeButton = null;
        if (likeFlag) {
            likeButton =
                <button type="submit" class="btn btn-link" onClick={this.unlikePressed} style={{ color: 'grey' }} >
                    <span class="fas fa-heart fa-2x"></span>
                </button>
        } else {
            likeButton =
                <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
                    <span class="far fa-heart fa-2x"></span>
                </button>
        }

        let bookmarkButton = null;
        if (bookmarkFlag) {
            bookmarkButton =
                <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
                    <span class="fas fa-bookmark fa-2x"></span>
                </button>
        } else {
            bookmarkButton =
                <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
                    <span class="far fa-bookmark fa-2x"></span>
                </button>
        }

        return (
            <div>
                <div class="tweet">
                    <div style={{ borderRadius: '0px' }} class="list-group-item">

                        <a href={`/viewtweet/` + this.props.data._id} onClick={this.viewTweetCalled}>
                            <div class='row'>
                                <div class='col-sm-1'>
                                    <img
                                        src={this.state.pic}
                                        class='preview-img'
                                        width='50'
                                        height='50'
                                        alt='profile pic'
                                    />
                                </div>

                                <div class='col-sm-11'>
                                    <h4 style={{ marginLeft: '3%' }} class='user-name'>
                                        <a href='/profile'
                                            id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
                                            {this.props.data.owner.first_name + " " + this.props.data.owner.last_name} </a>
                                        <span
                                            style={{
                                                fontWeight: 'normal',
                                                color: 'grey'
                                            }}
                                        >
                                            @{this.props.data.owner.username}
                                        </span>
                                        <span />
                                        <span
                                            style={{
                                                fontWeight: 'normal',
                                                color: 'grey'
                                            }}
                                        >

                                            . {dateVar}
                                        </span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                                    </h4>

                                    <div style={{ marginLeft: '3%', color: 'black' }}>{this.props.data.text}</div>
                                    <br />
                                    {hasImageTag}



                                </div>
                            </div>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey', marginLeft: '6%' }}>
                            <span class="far fa-comment fa-2x"></span>
                        </button>
                        <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

                        &nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
                            <span class="fas fa-retweet fa-2x"></span>
                        </button>
                        <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            {likeButton}
                        <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {bookmarkButton}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {deleteFlag}
                    </div>

                </div>
                {replyBar}
                {retweetBar}
            </div >
        )
    }
}

// export default TweetDataComp

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(
    mapStateToProps,
    { getProfile }
)(
    reduxForm({
        form: 'streamLogin',
    })(TweetDataComp)
)
