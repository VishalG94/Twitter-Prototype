import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
// import TweetData from './TweetData'
// import FollowersData1 from './FollowersData1'

class FollowersData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userdetails: "",
      replyToggle: false,
      email : ''
    }
  }

  componentDidMount() {
    console.log(this.props.data)
    axios.get((ROOT_URL) + '/followers', {
        params: { id: this.props.data }
    }).then(response => {
        if (response.status == 200) {
            console.log("Followers Fetched");
            console.log(response.data)
            console.log(response.data.first_name)
            // let temp = (response.data)
            // alert(temp)
            this.setState({
               userdetails : response.data.username,
               email : response.data.email
            })
            console.log("list of following " + this.state.userdetails)
        
                   } 
    }).catch(e => {
        console.log("Error in did mount" + e)
    })
}

Search = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('SelectedProfileId')
    sessionStorage.removeItem('SelectedUserProfile')
    sessionStorage.setItem('SelectedUserProfileId', e.target.id)
    sessionStorage.setItem('SelectedUserProfile', e.target.name)

    let x= sessionStorage.getItem('email')
    let y = sessionStorage.getItem('SelectedUserProfile')
    if(x!=y){
    console.log(x);
    window.location.replace('/profile');
    }
    else{
        window.location.replace('/userprofile')
    }
}

  render() {
    // // console.log("in tweet compo" + typeof (this.props.tweetsDtls) + this.props.tweetsDtls)
    // let details = this.props.followers.map(tweet => {
    //   return (
    //     <div>
    //       <FollowersData1 key={Math.random} data={tweet}></FollowersData1>
    //     </div>
    //   )
    // })
  

    return (
    
        <li style={{ width: "25%" }}> <a id={this.props.data} name={this.state.email} onClick={this.Search} style={{textAlign: "center", borderRadius: "0px", color: "black",fontWeight: '800' }} href="/profile" class="list-group-item">@{this.state.userdetails}</a></li>
    )
  }
}

export default FollowersData
