// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router";
// import Tweet from './Tweet'
// import ROOT_URL from "../../constants"
// import ReplyTweet from "./ReplyTweet";
// import RetweetTweet from "./RetweetTweet";
// import dateformat from 'dateformat';
// import {getProfile} from '../../actions'
// import { Field, reduxForm } from 'redux-form'
// import { connect } from 'react-redux'

// class TweetData extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             replyFlag: false,
//             retweetFlag: false,
//             pic:'',
//         }
//     }

//     componentWillMount()
//   {
//     let email =this.props.data.owner.email;
//     console.log(email);
//     let data = { email : email }
//         // alert(data.email)
//         this.props.getProfile({ params: data }, (response) => {
//           // console.log(this.props.user)
//           // alert(response.data);
//           console.log(this.props.user)
//             console.log(response.data);
//             let img = '/images/profile/' + response.data.image
            
//             this.setState({
              
//               pic: img
//       });
            
//         })
//   }

//     likePressed = e => {
//         var headers = new Headers();
//         //prevent page from refresh
//         e.preventDefault();
//         const data = {
//             tweetid: this.props.data._id,
//             email: sessionStorage.getItem("email"),
//             flag: 0
//         };
//         //set the with credentials to true
//         axios.defaults.withCredentials = true;
        
//         axios.post(ROOT_URL + "/hitlike", data).then(response => {
//             console.log("Status Code : ", response.data);
//             if (response.status === 200) {
                
//                 console.log(data.likes)
                
//                 this.setState({
//                     authFlag: true,
//                 });
//                 window.location.reload();
//             } else {
//                 this.setState({
//                     authFlag: false
//                 });
//             }
//         });
//     };

//     bookmarkPressed = e => {
//         var headers = new Headers();
//         //prevent page from refresh
//         e.preventDefault();
//         const data = {

//             tweetid: this.props.data._id,
//             email: sessionStorage.getItem("email"),
//             flag: 0
//         };
//         //set the with credentials to true
//         axios.defaults.withCredentials = true;
//         //make a post request with the user data
//         axios.post(ROOT_URL + "/hitbookmark", data).then(response => {
//             console.log("Status Code : ", response.status);
//             if (response.status === 200) {

//                 this.setState({
//                     authFlag: true
//                 });
//                 window.location.reload();
//             } else {
//                 this.setState({
//                     authFlag: false
//                 });
//             }
//         });
//     };

//     unbookmarkPressed = e => {
//         var headers = new Headers();
//         //prevent page from refresh
//         e.preventDefault();
//         const data = {

//             tweetid: this.props.data._id,
//             email: sessionStorage.getItem("email"),
//             flag: 1
//         };
//         //set the with credentials to true
//         axios.defaults.withCredentials = true;
//         //make a post request with the user data
//         axios.post(ROOT_URL + "/hitbookmark", data).then(response => {
//             console.log("Status Code : ", response.status);
//             if (response.status === 200) {

//                 this.setState({
//                     authFlag: true
//                 });
//                 window.location.reload();
//             } else {
//                 this.setState({
//                     authFlag: false
//                 });
//             }
//         });
//     };

//     unlikePressed = e => {
//         var headers = new Headers();
//         //prevent page from refresh
//         e.preventDefault();
//         const data = {

//             tweetid: this.props.data._id,
//             email: sessionStorage.getItem("email"),
//             flag: 1
//         };
//         //set the with credentials to true
//         axios.defaults.withCredentials = true;
//         //make a post request with the user data
//         axios.post(ROOT_URL + "/hitlike", data).then(response => {
//             console.log("Status Code : ", response.status);
//             if (response.status === 200) {

//                 this.setState({
//                     authFlag: true
//                 });
//                 window.location.reload();
//             } else {
//                 this.setState({
//                     authFlag: false
//                 });
//             }
//         });
//     };

//     replyPressed = e => {
//         console.log("Reply pressed")
//         this.setState({
//             replyFlag: true
//         })
//     }

//     retweetPressed = e => {
//         console.log("Retweet pressed!!")
//         this.setState({
//             retweetFlag: true
//         })
//     }

//     Search = (e) => {
//         e.preventDefault();
//         sessionStorage.removeItem('SelectedUserProfileId')
//         sessionStorage.removeItem('SelectedUserProfile')

//         sessionStorage.setItem('SelectedUserProfileId', e.target.id)
//         sessionStorage.setItem('SelectedUserProfile', e.target.name)
//         window.location.replace('/profile');
//     }

//     render() {
//         console.log(this.props.data)
//         let newdetails = (
//                 <div>
//                     <a href='#' class='list-group-item' >
//                         <div class='row'>
//                             <div class='col-sm-1'>
//                                 <img
//                                     src={this.state.pic}
//                                     class='preview-img'
//                                     width='50'
//                                     height='50'
//                                     alt='profile pic'
//                                 />
//                             </div>
//                             {/* <div class='col-sm-1'></div> */}
//                             <div class='col-sm-11'>
//                                 <h4 class='user-name'>
//                                     <a href='/profile'
//                                     id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                     {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                     <span
//                                         style={{
//                                             fontWeight: 'normal',
//                                             color: 'grey'
//                                         }}
//                                     >
//                                         @{this.props.data.owner.username}
//                                     </span>
//                                     <span />
//                                     <span
//                                         style={{
//                                             fontWeight: 'normal',
//                                             color: 'grey'
//                                         }}
//                                     >
//                                         {/* . {this.props.data.time} */}
//                                          . {dateVar}
//                                     </span>
//                                 </h4>
//                                 <h4 style={{ color: 'black',marginLeft:"30px" }}><span style={{marginLeft:"30px"}} >{this.props.data.text}</span></h4>
//                                 <br />
//                                 {/* retweet part starts here*/}
//                                 <div class='list-group-item'
//                                     style={{ borderRadius: '10px', borderStyle: "solid" , borderWidth:"2px", borderColor:"ededed"}}
//                                     width='500px'
//                                     height='250%' >

//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='25'
//                                             height='25'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
//                                         <h4 class='user-name'>
//                                             {/* <a href = '/profile' id={this.props.data.retweetdata.owner._id} name={this.props.data.retweetdata.owner.email} onClick={this.Search}> */}
//                                             {/* {this.props.data.retweetdata.owner.first_name + " " + this.props.data.retweetdata.owner.last_name}</a>  */}
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* @{this.props.data.retweetdata.owner.username} */}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.retweetdata.time} */}
//                                                 {/* . {dateVar1} */}
//                                                  {/* . {dateformat(this.props.data.retweetdata.time, 'mmm dd')} */}
//                                             </span>
//                                         </h4>
//                                         {/* <div style={{ color: 'black' }}>{this.props.data.retweetdata.text}</div> */}
//                                     </div>
//                                 </div>


//                                 {/* retweet part ends here */}


//                                 <br />
//                                 <br />
//                             </div>
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                 <span class="far fa-comment fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                             &nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    
//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                 <span class="fas fa-retweet fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
//                         <button type="submit" class="btn btn-link" onClick={this.unlikePressed} style={{ color: 'grey' }} >
//                                 <span class="fas fa-heart fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    

//                         </div>
//                 </div>

//                     </a >
//                 </div >

//                 )

//         console.log(this.props.data)
//         var dateVar = dateformat(this.props.data.time, 'mmm dd')
//         // var dateVar1 = dateformat(this.props.data.retweetdata.time, 'mmm dd')

//         let hasImageTag = null
//         if (this.props.data.image) {
//             hasImageTag = (
//                 <div>
//                     <img
//                         class='rounded-circle'
//                         style={{ borderRadius: '10px' }}
//                         src={this.props.data.image}
//                         width='500px'
//                         height='250%'
//                         alt='profile pic' Tweet
//                     />
                    
//                     <br />
//                     <br />
//                 </div>
//             )
//         }
      

//         let replyBar = null;
//         let retweetBar = null;

//         if (this.state.replyFlag) {
//             console.log("Inside set reply flag")
//             // this.setState({
//             //     replyFlag: false
//             // })
//             replyBar =
//                 <div>
//                     <ReplyTweet data={this.props.data} />
//                 </div>
//         }

//         if (this.state.retweetFlag) {
//             console.log("Inside set reply flag")
//             retweetBar =
//                 <div>
//                     <RetweetTweet data={this.props.data} />
//                 </div>
//         }
//         let id = sessionStorage.getItem('id')
//         let changeFlag = false
//         console.log("inside tweetdata" + this.props.data);
//         for (let i = 0; i < this.props.data.likes.length; i++) {
//             if (this.props.data.likes[i] == id  ) {
//                 //add object id retrieved from session storage
//                 console.log("already liked")
//                 changeFlag = true;
//                 break;
//             } else {
//                 console.log("not liked yet")
//             }
//         }

//         let bookmarkFlag = false
//         for (let i = 0; i < this.props.data.bookmarks.length; i++) {
//             if (this.props.data.bookmarks[i] == id) {
//                 //add object id retrieved from session storage
//                 console.log("already bookmarked")
//                 bookmarkFlag = true;
//                 break;
//             } else {
//                 console.log("not bookmarked yet")
//             }
//         }
//         // var newdetails = null;
//         var retweetdeta = null;
//         if (this.props.data.retweetFlag) {
//             console.log("Inside retweet!!")
//             if(changeFlag){
//                 changeFlag = false;
//                 if(bookmarkFlag){
//                     {newdetails}
//                     <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
//                                 <span class="fas fa-bookmark fa-2x"></span>
//                             </button>

//                 } else {

//                     {newdetails}
//                     <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
//                         <span class="far fa-bookmark fa-2x"></span>
//                     </button>
//                 }

//             } else {
//                 if(bookmarkFlag){
//                     newdetails =
//                 <div>
//                     <a href='#' class='list-group-item' >
//                         <div class='row'>
//                             <div class='col-sm-1'>
//                                 <img
//                                     src={this.state.pic}
//                                     class='preview-img'
//                                     width='50'
//                                     height='50'
//                                     alt='profile pic'
//                                 />
//                             </div>
//                             {/* <div class='col-sm-1'></div> */}
//                             <div class='col-sm-11'>
//                                 <h4 class='user-name'>
//                                 <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                     {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                     <span
//                                         style={{
//                                             fontWeight: 'normal',
//                                             color: 'grey'
//                                         }}
//                                     >
//                                         @{this.props.data.owner.username}
//                                     </span>
//                                     <span />
//                                     <span
//                                         style={{
//                                             fontWeight: 'normal',
//                                             color: 'grey'
//                                         }}
//                                     >
//                                         {/* . {this.props.data.time} */}
//                                          . {dateVar}
//                                     </span>
//                                 </h4>
//                                 <div style={{ color: 'black' }}>{this.props.data.text}</div>
//                                 <br />
//                                 {/* retweet part starts here*/}
//                                 <div class='list-group-item'
//                                     style={{ borderRadius: '10px', borderStyle: "solid" , borderWidth:"2px", borderColor:"ededed"}}
//                                     width='500px'
//                                     height='250%' >

//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='25'
//                                             height='25'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
//                                         <h4 class='user-name'>
//                                             <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                             {this.props.data.retweetdata.owner.first_name + " " + this.props.data.retweetdata.owner.last_name}</a>
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 @{this.props.data.retweetdata.owner.username}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.retweetdata.time} */}
//                                                 {/* . {dateVar1} */}
//                                                  . {dateformat(this.props.data.retweetdata.time, 'mmm dd')}
//                                             </span>
//                                         </h4>
//                                         <div style={{ color: 'black' }}>{this.props.data.retweetdata.text}</div>
//                                     </div>
//                                 </div>


//                                 {/* retweet part ends here */}


//                                 <br />
//                                 <br />
//                             </div>
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                 <span class="far fa-comment fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                             &nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    
//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                 <span class="fas fa-retweet fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
//                         <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
//                                 <span class="far fa-heart fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
//                                 <span class="fas fa-bookmark fa-2x"></span>
//                             </button>

//                         </div>
//                 </div>

//                     </a >
//                 </div >

//                 } else {
//                     newdetails =
//                 <div>
//                     <a href='#' class='list-group-item' >
//                         <div class='row'>
//                             <div class='col-sm-1'>
//                                 <img
//                                     src={this.state.pic}
//                                     class='preview-img'
//                                     width='50'
//                                     height='50'
//                                     alt='profile pic'
//                                 />
//                             </div>
                            
//                             {/* <div class='col-sm-1'></div> */}
//                             <div class='col-sm-11'>
//                                 <h4 class='user-name'>
//                                 <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                     {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                     <span
//                                         style={{
//                                             fontWeight: 'normal',
//                                             color: 'grey'
//                                         }}
//                                     >
//                                         @{this.props.data.owner.username}
//                                     </span>
//                                     <span />
//                                     <span
//                                         style={{
//                                             fontWeight: 'normal',
//                                             color: 'grey'
//                                         }}
//                                     >
//                                         {/* . {this.props.data.time} */}
//                                          . {dateVar}
//                                     </span>
//                                 </h4>
//                                 <div style={{ color: 'black' }}>{this.props.data.text}</div>
//                                 <br />
//                                 {/* retweet part starts here*/}
//                                 <div class='list-group-item'
//                                     style={{ borderRadius: '10px', borderStyle: "solid" , borderWidth:"2px", borderColor:"ededed"}}
//                                     width='500px'
//                                     height='250%' >

//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='25'
//                                             height='25'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
                                        
//                                        <h4 class='user-name'>
//                                        {/* <a href='/profile' id={this.props.data.retweetdata.owner._id} name={this.props.data.retweetdata.owner.email} onClick={this.Search}> */}
//                                             {/* {this.props.data.retweetdata.owner.first_name + " " + this.props.data.retweetdata.owner.last_name} */}
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* @{this.props.data.retweetdata.owner.username} */}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.retweetdata.time} */}
//                                                 {/* . {dateVar1} */}
//                                                  {/* . {dateformat(this.props.data.retweetdata.time, 'mmm dd')} */}
//                                             </span>
//                                             </h4>
                                            
//                                         {/* <div style={{ color: 'black' }}>{this.props.data.retweetdata.text}</div> */}
//                                     </div>
//                                 </div>


//                                 {/* retweet part ends here */}


//                                 <br />
//                                 <br />
//                             </div>
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                 <span class="far fa-comment fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                             &nbsp;
//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    
//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                 <span class="fas fa-retweet fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
//                         <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
//                                 <span class="far fa-heart fa-2x"></span>
//                             </button>
//                             <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
//                                 <span class="far fa-bookmark fa-2x"></span>
//                             </button>

//                         </div>
//                 </div>

//                     </a >
//                 </div >

//                 }
//             }

//         } else {
//             if (changeFlag) {
//                 changeFlag = false;
//                 if (bookmarkFlag) {
//                     newdetails =
//                         <div>
//                             <a href='#' class='list-group-item' >
//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='50'
//                                             height='50'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
//                                         <h4 class='user-name'>
//                                         <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                             {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 @{this.props.data.owner.username}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.time} */}
//                                                 . {dateVar}
//                                             </span>
//                                         </h4>
//                                         <div style={{ color: 'black' }}>{this.props.data.text}</div>
//                                         <br />
//                                         {hasImageTag}
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                             <span class="far fa-comment fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                                         &nbsp;
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-retweet fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <button type="submit" class="btn btn-link" onClick={this.unlikePressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-heart fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-bookmark fa-2x"></span>
//                                         </button>

//                                     </div>
//                                 </div>

//                             </a>
//                         </div>
//                 } else {
//                     newdetails =
//                         <div>
//                             <a href='#' class='list-group-item' >
//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='50'
//                                             height='50'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
//                                         <h4 class='user-name'>
//                                         <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                             {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 @{this.props.data.owner.username}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.time} */}
//                                                  . {dateVar}
//                                             </span>
//                                         </h4>
//                                         <div style={{ color: 'black' }}>{this.props.data.text}</div>
//                                         <br />
//                                         {hasImageTag}
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                             <span class="far fa-comment fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                                         &nbsp;
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-retweet fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <button type="submit" class="btn btn-link" onClick={this.unlikePressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-heart fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
//                                             <span class="far fa-bookmark fa-2x"></span>                                </button>

//                                     </div>
//                                 </div>

//                             </a>
//                         </div>
//                 }
//             } else {

//                 if (bookmarkFlag) {
//                     newdetails =
//                         <div>
//                             {/* <h1>Already Not liked</h1> */}
//                             <a href='#' class='list-group-item' >
//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='50'
//                                             height='50'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
//                                         <h4 class='user-name'>
//                                         <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                             {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 @{this.props.data.owner.username}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.time} */}
//                                                  . {dateVar}
//                                             </span>
//                                         </h4>
//                                         <div style={{ color: 'black' }}>{this.props.data.text}</div>
//                                         <br />
//                                         {hasImageTag}
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                             <span class="far fa-comment fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                                         &nbsp;
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-retweet fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
//                                             <span class="far fa-heart fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                         <button type="submit" class="btn btn-link" onClick={this.unbookmarkPressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-bookmark fa-2x"></span>
//                                         </button>

//                                     </div>
//                                 </div>

//                             </a>
//                         </div>
//                 } else {
//                     newdetails =
//                         <div>
//                             {/* <h1>Already Not liked</h1> */}
//                             <a href='#' class='list-group-item' >
//                                 <div class='row'>
//                                     <div class='col-sm-1'>
//                                         <img
//                                             src={this.state.pic}
//                                             class='preview-img'
//                                             width='50'
//                                             height='50'
//                                             alt='profile pic'
//                                         />
//                                     </div>
//                                     {/* <div class='col-sm-1'></div> */}
//                                     <div class='col-sm-11'>
//                                         <h4 class='user-name'>
//                                         <a href='/profile' id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
//                                             {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 @{this.props.data.owner.username}
//                                             </span>
//                                             <span />
//                                             <span
//                                                 style={{
//                                                     fontWeight: 'normal',
//                                                     color: 'grey'
//                                                 }}
//                                             >
//                                                 {/* . {this.props.data.time} */}
//                                                  . {dateVar}
//                                             </span>
//                                         </h4>
//                                         <div style={{ color: 'black' }}>{this.props.data.text}</div>
//                                         <br />
//                                         {hasImageTag}
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                       <button type="submit" class="btn btn-link" onClick={this.replyPressed} style={{ color: 'grey' }}>
//                                             <span class="far fa-comment fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.reply.length}</label>

//                                         &nbsp;
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


//                         <button type="submit" class="btn btn-link" onClick={this.retweetPressed} style={{ color: 'grey' }} >
//                                             <span class="fas fa-retweet fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.retweet.length}</label>

//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

//                         <button type="submit" class="btn btn-link" onClick={this.likePressed} style={{ color: 'grey' }} >
//                                             <span class="far fa-heart fa-2x"></span>
//                                         </button>
//                                         <label style={{ fontSize: "20px" }}> {this.props.data.likes.length}</label>


//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                         <button type="submit" class="btn btn-link" onClick={this.bookmarkPressed} style={{ color: 'grey' }} >
//                                             <span class="far fa-bookmark fa-2x"></span>
//                                         </button>

//                                     </div>
//                                 </div>

//                             </a>
//                         </div>
//                 }
//             }
//         }

//         return (
//             <Fragment>
//                 {newdetails}
//                 {replyBar}
//                 {retweetBar}
//             </Fragment>
//         )
//     }
// }

// // export default TweetData;

// const mapStateToProps = state => {
//  return { user: state.user }
//  }
 
//  export default connect(
//  mapStateToProps,
//  { getProfile }
//  )(
//  reduxForm({
//  form: 'streamLogin',
//  })(TweetData)
//  )


