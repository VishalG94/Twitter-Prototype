import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Tweet from './Tweet'
import ROOT_URL from "../../constants"
import ReplyTweet from "./ReplyTweet";



class TweetData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyFlag: false,
        }
        this.likePressed = this.likePressed.bind(this)
        this.unlikePressed = this.unlikePressed.bind(this)
        this.bookmarkPressed = this.bookmarkPressed.bind(this)
        this.unbookmarkPressed = this.unbookmarkPressed.bind(this)
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
            console.log("Status Code : ", response.status);
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
        axios.post(ROOT_URL + "/hitlike", data).then(response => {
            console.log("Status Code : ", response.status);
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
            flag: 0
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(ROOT_URL + "/hitlike", data).then(response => {
            console.log("Status Code : ", response.status);
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
            console.log("Status Code : ", response.status);
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
        console.log("Reply pressed")
        this.setState({
            replyFlag: true
        })
    }


    render() {
        let replyBar = null;

        if (this.state.replyFlag) {

            console.log("Inside set reply flag")
            // this.setState({
            //     replyFlag: false
            // })
            replyBar =
                <div>
                    <ReplyTweet data={this.props.data} />
                </div>

        }

        let changeFlag = false;
        let bookmarkFlag = false;

        for (let i = 0; i < this.props.data.bookmarks.length; i++) {
            if (this.props.data.bookmarks[i] == "5dd3731f6b67e9677c1b3be9") {
                //add object id retrieved from session storage
                console.log("already bookmarked")
                bookmarkFlag = true;
                break;
            } else {
                console.log("not bookmarked yet")
            }
            console.log("BF" + bookmarkFlag)
        }

        console.log("inside tweetdata" + this.props.data);
        for (let i = 0; i < this.props.data.likes.length; i++) {
            if (this.props.data.likes[i] == "5dd3731f6b67e9677c1b3be9") {
                //add object id retrieved from session storage
                console.log("already liked")
                changeFlag = true;
                break;
            } else {
                console.log("not liked yet")
            }
            console.log("CF" + changeFlag)
        }

        var newdetails = null;
        if (changeFlag) {
            changeFlag = false;

            if (bookmarkFlag) {
                bookmarkFlag = false;

                newdetails =
                    <div>
                        <a href='#' class='list-group-item' >
                            <div class='row'>
                                <div class='col-sm-1'>
                                    <img
                                        src={require('../img/Twitternew.png')}
                                        class='preview-img'
                                        width='50'
                                        height='50'
                                        alt='profile pic'
                                    />
                                </div>
                                {/* <div class='col-sm-1'></div> */}
                                <div class='col-sm-11'>
                                    <h4 class='user-name'>
                                        {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}
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
                                            . {this.props.data.time}
                                        </span>
                                    </h4>
                                    <div style={{ color: 'black' }}>{this.props.data.text}</div>
                                    <br />
                                    {/* {hasImageTag} */}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
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

                    <button type="submit" class="btn btn-link" onClick={this.unlikePressed} style={{ color: 'grey' }} >
                                        <span class="fas fa-heart fa-2x"></span>
                                    </button>
                                    <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
                                        <span class="fas fa-bookmark fa-2x"></span>                                </button>

                                </div>
                            </div>

                        </a>
                    </div>
            } else {
                newdetails =
                    <div>
                        <a href='#' class='list-group-item' >
                            <div class='row'>
                                <div class='col-sm-1'>
                                    <img
                                        src={require('../img/Twitternew.png')}
                                        class='preview-img'
                                        width='50'
                                        height='50'
                                        alt='profile pic'
                                    />
                                </div>
                                {/* <div class='col-sm-1'></div> */}
                                <div class='col-sm-11'>
                                    <h4 class='user-name'>
                                        {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}
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
                                            . {this.props.data.time}
                                        </span>
                                    </h4>
                                    <div style={{ color: 'black' }}>{this.props.data.text}</div>
                                    <br />
                                    {/* {hasImageTag} */}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
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

                    <button type="submit" class="btn btn-link" onClick={this.unlikePressed} style={{ color: 'grey' }} >
                                        <span class="fas fa-heart fa-2x"></span>
                                    </button>
                                    <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
                                        <span class="far fa-bookmark fa-2x"></span>                                </button>

                                </div>
                            </div>

                        </a>
                    </div>
            }

        } else {

            if (bookmarkFlag) {
                newdetails =
                    <div>
                        {/* <h1>Already Not liked</h1> */}
                        <a href='#' class='list-group-item' >
                            <div class='row'>
                                <div class='col-sm-1'>
                                    <img
                                        src={require('../img/Twitternew.png')}
                                        class='preview-img'
                                        width='50'
                                        height='50'
                                        alt='profile pic'
                                    />
                                </div>
                                {/* <div class='col-sm-1'></div> */}
                                <div class='col-sm-11'>
                                    <h4 class='user-name'>
                                        {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}
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
                                            . {this.props.data.time}
                                        </span>
                                    </h4>
                                    <div style={{ color: 'black' }}>{this.props.data.text}</div>
                                    <br />
                                    {/* {hasImageTag} */}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
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

                    <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
                                        <span class="far fa-heart fa-2x"></span>
                                    </button>
                                    <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
                                        <span class="fas fa-bookmark fa-2x"></span>
                                    </button>
                                </div>
                            </div>

                        </a>
                    </div>
            } else {
                newdetails =
                    <div>
                        {/* <h1>Already Not liked</h1> */}
                        <a href='#' class='list-group-item' >
                            <div class='row'>
                                <div class='col-sm-1'>
                                    <img
                                        src={require('../img/Twitternew.png')}
                                        class='preview-img'
                                        width='50'
                                        height='50'
                                        alt='profile pic'
                                    />
                                </div>
                                {/* <div class='col-sm-1'></div> */}
                                <div class='col-sm-11'>
                                    <h4 class='user-name'>
                                        {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}
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
                                            . {this.props.data.time}
                                        </span>
                                    </h4>
                                    <div style={{ color: 'black' }}>{this.props.data.text}</div>
                                    <br />
                                    {/* {hasImageTag} */}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
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

                    <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
                                        <span class="far fa-heart fa-2x"></span>
                                    </button>
                                    <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
                                        <span class="far fa-bookmark fa-2x"></span>
                                    </button>
                                </div>
                            </div>

                        </a>
                    </div>
            }
        }
        return (
            // <a href='#' class='list-group-item' >
            //     <div class='row'>
            //         <div class='col-sm-1'>
            //             <img
            //                 src={require('../img/Twitternew.png')}
            //                 class='preview-img'
            //                 width='50'
            //                 height='50'
            //                 alt='profile pic'
            //             />
            //         </div>
            //         {/* <div class='col-sm-1'></div> */}
            //         <div class='col-sm-11'>
            //             <h4 class='user-name'>
            //                 {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}
            //                 <span
            //                     style={{
            //                         fontWeight: 'normal',
            //                         color: 'grey'
            //                     }}
            //                 >
            //                     @{this.props.data.owner.username}
            //                 </span>
            //                 <span />
            //                 <span
            //                     style={{
            //                         fontWeight: 'normal',
            //                         color: 'grey'
            //                     }}
            //                 >
            //                     . {this.props.data.time}
            //                 </span>
            //             </h4>
            //             <div style={{ color: 'black' }}>{this.props.data.text}</div>
            //             <br />
            //             {/* {hasImageTag} */}
            //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            //       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
            //                 <span class="far fa-comment fa-2x"></span>
            //             </button>
            //             <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

            //             &nbsp;
            //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


            //         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
            //                 <span class="fas fa-retweet fa-2x"></span>
            //             </button>
            //             <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

            //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            //         <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
            //                 <span class="far fa-heart fa-2x"></span>
            //             </button>
            //             <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


            //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            //   <i class='fas fa-arrow-u  p fa-2x' />
            //         </div>
            //     </div>

            // </a>
            <Fragment>
                {newdetails}
                {replyBar}
            </Fragment >
        )
    }
}

export default TweetData;
