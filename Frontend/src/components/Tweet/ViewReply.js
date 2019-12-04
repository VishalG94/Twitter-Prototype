import React from 'react'
import { nominalTypeHack } from 'prop-types'
import '../WriteTweet/WriteTweet.css'
import axios from 'axios';
import ROOT_URL from "../../constants"

class ReplyTweet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }

    }
    

    render() {

        let userEdit = null;
        if (!this.state.url) {
            <div>
                <img width={"200"} height={"200"} alt={"Smiley face"} src={this.state.url} />
            </div>
        }


        return (
            <li style={{ borderRadius: '0%' }} href='#' class='list-group-item'>
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

                    <div class='col-sm-11'>
                        <div class='bg'>
                            <h4 style={{ marginLeft: '3%' }} class='user-name'>
                                @{this.props.data.username}
                            </h4>
                            <span style={{ marginLeft: '3%' }}>{this.props.data.comment}</span>
                        </div>
                        <br />
                    </div>
                </div>
            </li>
        )
    }
}

export default ReplyTweet