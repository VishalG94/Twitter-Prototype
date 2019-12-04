import React, { Component } from 'react'
import '../../App.css'
import './Profile.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getProfile } from '../../actions'
import { connect } from 'react-redux'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import dotenv from 'dotenv'
import { Field, reduxForm } from 'redux-form';
import ROOT_URL from '../../constants.js'
import sampleImg from '../img/GrubhubDetails.jpg'
import SearchProfileTweets from '../UserTweets/SearchProfileTweets'
import SearchProfileLikes from '../UserTweets/SearchProfileLikes'


class Profile extends Component {
    // call the constructor method
    constructor(props) {
        // Call the constrictor of Super class i.e The Component
        super(props)
        // maintain the state required for this component
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            profilepic: '',
            coverpic: '',
            password: '',
            file: '',
            img: '',
            username:'',
            component: 'Tweets',
            // following:false,
            follow: false
        }

    }

    componentWillMount() {

        this.setState({
            authFlag: false,
            authFailed: false,
            profilepic: '',
            // follow: false
        })

        let temp = sessionStorage.getItem('SelectedUserProfile')
        console.log(temp);
        let data = { email: temp }
        console.log(data.email)
        axios.defaults.withCredentials = true;
        this.props.getProfile({ params: data }, (response) => {
           
            console.log(this.props.user)
            console.log(response.data);            
            
            let img = `${ROOT_URL}/images/profile/`
              if (response.data.image) {
                  img = img + response.data.image
              } else {
                  img = img + 'Twitternew.png'
              }  
            this.setState({
                email: response.data.email,
                // phone: response.data.phone,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                profilepic: img,
                username: response.data.username,                

            })

            // axios.post(`${ROOT_URL}/userimage`, data).then(response => {
            //     // console.log('Axios get image:', response.data)
            //     this.setState({
            //         profilepic: 'data:image/png;base64, ' + response.data
            //     })
    
            // })

            sessionStorage.setItem('username',this.state.username)
            axios.post(`${ROOT_URL}/profileview`, data)
            .then(response => {
            // sessionStorage.removeItem('userDtls')
            
            // this.setState({
            //     email: response.data.email,
            //     // phone: response.data.phone,
            //     password: response.data.password,
            //     first_name: response.data.first_name,
            //     last_name: response.data.last_name,
            //     profilepic: img,
            //     username: response.data.username,                

            // })
            
            
            
        });

        let temp1 = sessionStorage.getItem('email')
        console.log(temp1);
        let data1 = { email: temp1 }
        // if(this.state.follow)
        console.log(data1.email)
        this.props.getProfile({ params: data1 }, (response) => {
            console.log(this.props.user)
            console.log(response.data);
            this.setState({
                follow: response.data.following.includes(sessionStorage.getItem('SelectedUserProfileId'))
            })
            // alert(this.state.follow)
        });

       
    })
    }

    selectComponent = e => {
        e.preventDefault();
        this.setState({
            component : e.target.id
        
        })

    }

    followupdate = e => {
        // e.preventDefault();
        const data = {
            // following: sessionStorage.getItem('user_email'),
            following: sessionStorage.getItem('SelectedUserProfileId'),
            email: sessionStorage.getItem('email'),
            flag: 0
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/followupdate`, data)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        following: response.data.following,
                        follow: true
                    });
                    // alert("Following User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

        const data1 = {
            // new_email: sessionStorage.getItem('user_email'),
            new_email: sessionStorage.getItem('SelectedUserProfile'),
            followedBy: sessionStorage.getItem('id'),
            flag: 0
        }
        console.log(data1);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/followedupdate`, data1)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data1);
                if (response.status === 200) {
                    this.setState({
                        followedBy: data1.followedBy,
                        // follow: true
                    });
                    // alert("Followed By User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

    }



    unfollow = e => {
        e.preventDefault();
        const data = {
            // following: sessionStorage.getItem('user_email'),
            following: sessionStorage.getItem('SelectedUserProfileId'),
            email: sessionStorage.getItem('email'),
            flag: 1
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/followupdate`, data)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        following: response.data.following,
                        follow: false
                    });
                    // alert("Unfollowing User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

        const data1 = {
            // new_email: sessionStorage.getItem('user_email'),
            new_email: sessionStorage.getItem('SelectedUserProfile'),
            followedBy: sessionStorage.getItem('id'),
            flag: 1
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/followedupdate`, data1)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(data1);
                if (response.status === 200) {
                    this.setState({
                        followedBy: data1.followedBy,
                        // follow: true
                    });
                    // alert("UnFollowing User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

    }


    render() {

        let selectedComp = null;
        if(this.state.component==='Tweets'){
            selectedComp = (<SearchProfileTweets></SearchProfileTweets>)
        }else if(this.state.component === 'Likes'){
            selectedComp = (<SearchProfileLikes></SearchProfileLikes>)
        }

        let change = null;

        if (!this.state.follow) {
            change = (
                <button type="button" style={{ fontSize: '15.4px', borderRadius: '30px' }} class="btn btn-danger" onClick={this.followupdate} >Follow</button>
            )
        }
        else {
            change = (
                <button type="button" style={{ fontSize: '15.4px', borderRadius: '30px' }} class="btn btn-danger" onClick={this.unfollow} >Following</button>
            )
        }

        return (
            <div>
                <div className="col-sm-2">
                    <LeftNavbar />
                </div>
                <div class='split-center_new'>
                    <h3
                        style={{
                            marginLeft: '20px',
                            fontWeight: '800',
                            fontSize: '19px'
                        }}
                    >
                       {this.state.first_name}{this.state.last_name}
                    </h3>


                    <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                        <div class='preview text-center' >
                            <div>
                                <img class="product-holder "
                                    style={{ backgroundColo: "black" }}
                                    src={this.state.profilepic}
                                    width='1000'
                                    height='300'>

                                </img>
                                <img
                                    class="plus-image img-circle "
                                    style={{ backgroundColor: "black", border: "black" }}
                                    src={this.state.profilepic}
                                    width='200'
                                    height='200'
                                />
                                <br />
                                <br></br>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div style={{ float: "right" }}>
                            {change}
                        </div>
                        <br></br>
                        <br></br>

                        <div style={{ marginBottom: "100px" }}>
                            <nav class="navbar navbar">

                                <div class="navbar-header">
                                </div>

                                <ul style={{ width: "100%" }} class="nav navbar-nav">

                                    <li style={{ width: "25%" }}> <a id="Tweets" onClick={this.selectComponent} style={{ textAlign: "center", borderRadius: "0px", borderRight: 'none', color: "black" }} href="/profile/tweets" class="list-group-item">Tweets</a></li>
                                    <li style={{ width: "25%" }}> <a style={{ textAlign: "center", borderRadius: "0px", borderRight: 'none', color: "black" }} href="#" class="list-group-item">Tweets and Replies</a></li>
                                    <li style={{ width: "25%" }}> <Link style={{ textAlign: "center", borderRadius: "0px", borderRight: 'none', color: "black" }} to={{ pathname:'/userlists',  state:{ username:this.state.username }}} class="list-group-item">View Lists</Link></li>
                                    <li style={{ width: "25%" }}> <a id="Likes" onClick={this.selectComponent} style={{ textAlign: "center", borderRadius: "0px", color: "black" }} href="/profile/likes" class="list-group-item">Likes</a></li>

                                </ul>

                            </nav>
                            {selectedComp}
                        </div>

                       
                    </div>

                </div>
            </div>





        )
    }

}


function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getProfile })(Profile);
