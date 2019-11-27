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
import UserTweets from '../UserTweets/UserTweets'

class UserProfile extends Component {
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
            password: '',
            file: '',
            img: '',
            edit: false,
            userid : '',

            // following:false,
            follow: false
        }

    }

    componentWillMount() {
        this.setState({
            authFlag: false,
            authFailed: false,
            // profilepic: '',

        })

        let temp = sessionStorage.getItem('email')
        console.log(temp);
        let data = { email: temp }
        console.log(data.email)
        this.props.getProfile({ params: data }, (response) => {
            console.log(this.props.user)
            console.log(response.data);
            let img = '/images/profile/' + response.data.image
            // console.log(img);

            this.setState({
                email: response.data.email,
                // phone: response.data.phone,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                // follow : response.data.following,
                profilepic: img
                // profilepic: img

            })
            console.log(this.props)
        });

    }

    update = (e) => {
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: sessionStorage.getItem('email'),
            phone: this.state.phone,
            password: this.state.password,
            // path:this.state.path
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/update`, data)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        first_name: response.data.first_name,
                        last_name: response.data.last_name,
                        password: response.data.password,
                        // email: response.data[0].email,
                        // phone: response.data.phone
                    });
                    // alert("Profile updation successful")
                    window.location.reload();
                } else {
                    console.log('Change failed !!! ');

                }
            });

    }
    imageChangeHandler = e => {
        this.setState({
            file: e.target.files[0]
        })
    }

    uploadImage = e => {
        e.preventDefault()
        console.log(this.state.file);
        const formData = new FormData()

        let email = sessionStorage.getItem('email')
        console.log(email);
        formData.append('myImage', this.state.file, email)
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post('/userprofile', formData, config)
            .then(response => {
                let data = { 'email': email }
                axios.post(`${ROOT_URL}/userimage`, data).then(response => {
                    console.log('Axios get:', response.data)
                    this.setState({
                        profilepic: 'data:image/png;base64, ' + response.data
                    })
                })

            })
            .catch(error => { })
    }


    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    editprofilebutton = e => {
        this.setState({
            edit: true
        })
    }


    onSubmit = (e) => {
        console.log("in submit profile");
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            path: this.state.path
        }
        console.log("in submit profile  data:" + data);
        this.props.getProfile(data
            , (res) => {
                console.log("update profile", res.data);
                if (res.status === 200) {
                    console.log(res.data[0]);
                    // sessionStorage.setItem('Email', res.data[0].Email);
                    // this.props.history.push('/login');
                }
            })
    }
    render() {
        let editprofile = null;
        console.log(this.state.edit);
        if (!this.state.edit) {

            editprofile = (
                <div class='split-right_new'>
                    <div style={{ marginLeft: "10px" }}>
                        <h3>Edit Profile</h3>
                        <div className="form-group">
                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}><span class="font">First name: {this.props.user.first_name}</span></div>
                            <div className="boxwidth-change">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" placeholder='Edit first name' />
                            </div>
                        </div>

                        <div class="form-group">
                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Last name: {this.props.user.last_name} </div>
                            <div className="boxwidth-change">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" autoFocus name="last_name" placeholder='Edit Last name' />
                            </div>
                        </div>

                        <div class="form-group">
                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current password : ***** </div>
                            <div className="boxwidth-change">
                                <input
                                    onChange={this.inputChangeHandler}
                                    type="password"
                                    placeholder="Edit Password"
                                    class="form-control"
                                    name="password" />
                            </div>
                        </div>

                        <div className="wrapperbutton">
                            <button type="button" className="btn btn-primary btn-rounded" onClick={this.update}>Edit Profile</button>
                        </div>
                    </div>
                </div>
            )
        }
        let updatePic = null
        if (this.state.file !== '') {
            updatePic = (
                <button
                    style={{ marginLeft: '200px' }}
                    className='btn btn-link'
                    type='submit'
                >
                    Update
              </button>
            )
        }

        let image_new = null;
        if (this.state.profilepic) {
            image_new = (
                <img
                    class="plus-image img-circle "
                    style={{ backgroundColor: "black", border: "black" }}
                    src={this.state.profilepic}
                    width='200'
                    height='200'

                />
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
                        {this.props.user.username}
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
                                {image_new}
                                {/* <div className='browse-button'>
                                    <i className='fa fa-pencil' /> */}
                                    <div style={{marginLeft : "200px"}}>
                                <input
                                    // class='browse-input'
                                    
                                    type='file'
                                    onChange={this.imageChangeHandler}
                                    name='myImage'
                                    id='myImage'
                                />
</div>
                            </div>
                        </div>

                        {updatePic}
                    </form>
                    <br></br>
                    <br></br>
                    <div style={{ marginBottom: "100px" }}>
                        <nav class="navbar navbar-inverse">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                </div>

                                <ul class="nav navbar-nav">

                                    <li > <a href="/userprofile/tweets" class="list-group-item">Tweets</a></li>
                                    <li> <a href="#" class="list-group-item">Tweets and Replies</a></li>
                                    <li> <a href="#" class="list-group-item">Media</a></li>
                                    <li> <a href="/userprofile/likes" class="list-group-item">Likes</a></li>
                                    {/* <button class="btn btn-outline-success" onclick={this.editprofilebutton} type="button">Edit Profile</button> */}

                                </ul>
                            </div>

                        </nav>
                    </div>
                </div>
                {editprofile}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getProfile })(UserProfile);
