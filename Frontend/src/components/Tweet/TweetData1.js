import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Tweet from './Tweet'
import ROOT_URL from "../../constants"
import ReplyTweet from "./ReplyTweet";
import TweetDataComp from "./TweetDataComp"
import RetweetDataComp from "./RetweetDataComp"



class TweetData1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyFlag: false,
        }
    }

    render() {
        let details = null;
        if (!this.props.data.retweetFlag) {
            details =
                <TweetDataComp data={this.props.data} />

        } else {
            details =
                <RetweetDataComp data={this.props.data} />
        }

        return (
            <Fragment>
                {details}
                {/* {replyBar} */}
            </Fragment >
        )
    }
}

export default TweetData1;
