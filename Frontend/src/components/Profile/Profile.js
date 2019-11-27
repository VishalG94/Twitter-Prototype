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
            password: '',
            file: '',
            img: '',

            // following:false,
            follow: false
        }

    }

    componentWillMount() {
        this.setState({
            authFlag: false,
            authFailed: false,
            profilepic: '',

        })

        let temp = sessionStorage.getItem('email')
        console.log(temp);
        let data = { email: temp }
        console.log(data.email)
        this.props.getProfile({ params: data }, (response) => {
            console.log(this.props.user)
            // let img = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/public/profile/'+response.data.image
            // console.log(img);
            console.log(response.data);
            this.setState({
                email: response.data.email,
                // phone: response.data.phone,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                // profilepic:data.data.image,
                // profilepic: img

            })

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
                        phone: response.data.phone


                    });
                    alert("Profile Update Succefully");
                } else {
                    console.log('Change failed !!! ');

                }
                // this.props.loginuser(data);
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
            .post('/profile', formData, config)
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

    followupdate = e => {
        e.preventDefault;
        const data = {
            following: sessionStorage.getItem('email')
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
                    alert("Following User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
                }
            })
    }


    render() {
        let userprofile = null;
        let user = true;
        if (user) {
            userprofile = (
                <div>
                    <div className="editname">
                        <h3>Edit account</h3><br></br>
                    </div>
                    <div className="form-group">
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>First name: {this.props.user.first_name}</div>
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
                        <button type="submit" className="btn btn-info" onClick={this.update}>Edit Profile</button>
                    </div>
                </div>

            )
        }

        let change = null;
        if (!this.state.follow) {
            change = (
                <button class="btn-danger" onClick={this.followupdate} style={{ float: "right" }}>Follow</button>
            )
        }
        else {
            change = (
                <button class="btn-danger" style={{ float: "right" }} >Following</button>
            )
        }
        let updatePic = null

        if (this.state.file !== '') {
            updatePic = (
                <button
                    style={{ marginLeft: '537px' }}
                    className='btn btn-link'
                    type='submit'
                >
                    Update
              </button>
            )
        }
        return (
            <div>

                <div class="container-fluid">
                    <div class="sidebar"></div>
                    <div className="row">
                        <div className="col-sm-2">
                            <LeftNavbar />
                        </div>
                        <div className="col-sm-10">

                            <div class="container">
                                <div class="login-form">
                                    <div className="column-change">
                                        {/* <div class="main-div"> */}

                                        <a href='#' className='list-group-item'>

                                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{this.props.user.username}</div>
                                            {/* <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{this.props.user}</div> */}
                                        </a>

                                        <a href='#' className='list-group-item' style={{ backgroundColor: "#d3d3d3" }}>

                                            <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                                                <div class='preview text-center' >
                                                    <div>
                                                        <img
                                                            class="img-circle"
                                                            style={{ backgroundColor: "black" }}
                                                            src={this.state.profilepic}
                                                            width='200'
                                                            height='200'
                                                        />
                                                        <div className='browse-button'>
                                                            <i className='fa fa-pencil' />
                                                            <input
                                                                class='browse-input'
                                                                type='file'
                                                                onChange={this.imageChangeHandler}
                                                                name='myImage'
                                                                id='myImage'
                                                            />
                                                            <br />
                                                        </div>
                                                    </div>
                                                </div>
                                                {updatePic}
                                            </form>
                                        </a>

                                        {/* <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{data.name}</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{data.username}</div> */}


                                        <br></br>
                                        <ul class="list-inline">
                                            <li> <a href="/profile/tweets" class="list-group-item">Tweets</a></li>
                                            <li> <a href="#" class="list-group-item">Tweets and Replies</a></li>
                                            <li> <a href="#" class="list-group-item">Media</a></li>
                                            <li> <a href="/profile/likes" class="list-group-item">Likes</a></li>
                                            {change}
                                        </ul>
                                        {userprofile}
                                        {/* <div className="wrapperbutton"> */}
                                        {/* <button type="submit" className="button-edit" onClick={this.followupdate}>Follow</button>
                                    </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
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
