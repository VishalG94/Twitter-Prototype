import React from 'react'
import { nominalTypeHack } from 'prop-types'
import '../WriteTweet/WriteTweet.css'
import axios from 'axios';
import ROOT_URL from "../../constants"
import {getProfile} from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class RetweetTweet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: "",
            file: null,
            url: null,
            pic : ''
        }

        this.textChangeHandler = this.textChangeHandler.bind(this)
        this.submitRetweet = this.submitRetweet.bind(this);
    }

    componentWillMount()
    {
      let email =sessionStorage.getItem('email');
      console.log(email);
      let data = { email : email }
          // alert(data.email)
          this.props.getProfile({ params: data }, (response) => {
            // console.log(this.props.user)
            // alert(response.data);
            console.log(this.props.user)
              console.log(response.data);
            //   let img = '/images/profile/' 

            let img = `${ROOT_URL}/images/profile/`
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
    textChangeHandler = (e) => {
        this.setState({
            text: e.target.value
        })
        console.log(this.state.text)
    }

    submitRetweet = (e) => {
        e.preventDefault();
        const data = {
            tweetid: this.props.data._id,
            text: this.state.text,
            email: sessionStorage.getItem('email')
        }

        axios.defaults.withCredentials = true;
        axios.post(ROOT_URL + "/writeretweet", data).then(response => {
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
    }

    render() {
       
        let userEdit = null;
        if (!this.state.url) {
            <div>
                <img width={"200"} height={"200"} alt={"Smiley face"} src={this.state.url} />
            </div>
        }


        return (
            <li href='#' class='list-group-item'>
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
                        <div class='bg'>
                            <textarea
                                maxlength='280'
                                rows='1'
                                class='RetweetTweet'
                                placeholder="Write your retweet description here!"
                                onChange={this.textChangeHandler}
                            />

                            <button
                                type='button'
                                style={{
                                    float: 'right',
                                    outline: 'none',
                                    border: 'none',
                                    backgroundColor: '#4285f4'
                                }}
                                onClick={this.submitRetweet}
                                class='btn btn-primary'
                            >
                                Retweet
              </button>
                            {/* {userEdit} */}
                        </div>
                        <br />
                    </div>
                </div>
            </li>
        )
    }
}

// export default RetweetTweet

const mapStateToProps = state => {
    return { user: state.user }
    }
    
export default connect( mapStateToProps,{ getProfile })(
    reduxForm({form: 'streamLogin',})(RetweetTweet))