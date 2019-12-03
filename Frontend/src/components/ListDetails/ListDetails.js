import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
import Tweet from '../Tweet/Tweet'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import './ListDetails.css'
import EditList from '../Lists/EditList';

class ListDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      flag : false,
      text:"",
      replyToggle: false
    }
  }


  
  componentDidMount() {
    var email = sessionStorage.getItem("email")
    axios.get(ROOT_URL + '/fetchlisttweets', {
      params: {
        email: email,
        list_id : this.props.location.state.id
      }
    })
      .then((response) => {
        console.log("Received response")
        console.log(response)
        //update the state with the response data
        
        this.setState({
          tweets: this.state.tweets.concat(response.data)
        });

        if(this.state.tweets.length==0)
        {
            this.setState({
                text : <div style={{position:"relative",marginTop:"25%",marginLeft:"20%"}}>
                        
                <h3 style={{fontWeight:"bold",color:"black"}}>
                There aren’t any Tweets in this List
                </h3>
                <br/>
                <h4 style={{color:"grey"}}>
                When anyone in this List Tweets, they’ll show up here.
                </h4>
            </div>
            })
        }
      });
  }

  // let Tweet = props => {


  render() {

    return (
        <div>
        <div>
          <div class='col-sm-2'>
            <LeftNavbar />
          </div>

          <div class='split-center-list-details'>
          <ul> 
                {/* <EditList/>
                <hr/>                  */}
                <span>
                <Tweet tweetsDtls={this.state.tweets} /> 
                
                {this.state.text}                
                
                </span>      
                
              </ul>
            </div>          
         
        </div>
      </div >

    )
  }
}

export default ListDetails
