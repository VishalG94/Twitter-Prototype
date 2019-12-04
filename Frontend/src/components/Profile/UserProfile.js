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
import UserLikes from '../UserTweets/UserLikes'
import Lists from '../Lists/Lists'

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
            userid: '',
            zipcode: '',

            // following:false,
            follow: false,
            component: 'Tweets'
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
            // console.log(this.props.user)
            // console.log(response.data);
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
                zipcode: response.data.zipcode,
                // follow : response.data.following,
                // profilepic: response.data.image,
                profilepic: img

            })
            // alert(response.data.image)
        });


        // axios.post(`${ROOT_URL}/userimage`, data).then(response => {
        //     // console.log('Axios get image:', response.data)
        //     this.setState({
        //         profilepic: 'data:image/png;base64, ' + response.data
        //     })

        // })



    }

    update = (e) => {
        console.log("hello lastname" + this.state.last_name)
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: sessionStorage.getItem('email'),
            phone: this.state.phone,
            password: this.state.password,
            zipcode: this.state.zipcode
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
                        zipcode: response.data.zipcode
                        // email: response.data[0].email,
                        // phone: response.data.phone
                    });
                    // alert("Profile updation successful")
                    // window.location.reload();
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
        // console.log(email);
        formData.append('myImage', this.state.file, email)
        // console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post(`${ROOT_URL}/userprofile`, formData, config)
            .then(response => {
                let data = { 'email': email }
                // axios.post(`${ROOT_URL}/userimage`, data).then(response => {
                //     // console.log('Axios get image:', response.data)
                //     this.setState({
                //         profilepic: 'data:image/png;base64, ' + response.data
                //     })
                // })

                let img = `${ROOT_URL}/images/profile/`
              if (response.data.image) {
                  img = img + response.data.image
              } else {
                  img = img + 'Twitternew.png'
              }
              this.setState({
                    profilepic:img
              })
              window.location.reload()

            })
            .catch(error => { console.log('Error in image retrieve') })
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

    deleteprofile = e => {
        const data = {
            // following: sessionStorage.getItem('user_email'),
            id: sessionStorage.getItem('id'),
            email: sessionStorage.getItem('email'),

        }
        // console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/deleteprofile`, data)
            .then(response => {
                // console.log("Status Code  is : ", response.status);
                // console.log(response.data);
                if (response.status === 200) {
                    alert("Deleted User Successfully");
                    sessionStorage.clear();
                    window.location.replace('/login')
                } else {
                    console.log('Change failed !!! ');
                }

            });

    }

    selectComponent = e => {
        e.preventDefault();
        this.setState({
            component: e.target.id

        })

    }


    render() {
        let selectedComp = null;
        if (this.state.component === 'Tweets') {
            selectedComp = (<UserTweets></UserTweets>)
        } else if (this.state.component === 'Likes') {
            selectedComp = (<UserLikes></UserLikes>)
        } else if (this.state.component === 'Lists') {
            selectedComp = (<Lists></Lists>)
        }

        let editprofile = null;
        console.log(this.state.edit);
        if (this.state.component === 'Edit Profile') {

            editprofile = (
                <form onSubmit={this.update}>
                    <div class='split-right_new'>
                        <div style={{ marginLeft: "10px" }}>
                            <h3>Edit Profile</h3>

                            <div className="form-group">

                                <div style={{ fontWeight: 'bold', fontSize: '18px' }}><span class="font">First name: {this.state.first_name}</span></div>
                                <div className="boxwidth-change">
                                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" required placeholder='Edit first name' />
                                </div>
                            </div>

                            <div class="form-group">
                                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Last name: {this.state.last_name} </div>
                                <div className="boxwidth-change">
                                    <input onChange={this.inputChangeHandler} type="text" class="form-control" required autoFocus name="last_name" placeholder='Edit Last name' />
                                </div>
                            </div>

                            <div class="form-group">
                                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current password : ***** </div>
                                <div className="boxwidth-change">
                                    <input
                                        onChange={this.inputChangeHandler}
                                        type="password"
                                        required
                                        placeholder="Edit Password"
                                        class="form-control"
                                        name="password" />
                                </div>
                            </div>

                            <div class="form-group">
                                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Zipcode : {this.state.zipcode} </div>
                                <div className="boxwidth-change">
                                    <input onChange={this.inputChangeHandler} type="text" class="form-control" pattern="[0-9]{1,5}" required autoFocus name="zipcode" placeholder='Enter 5 digit Zipcode' />
                                </div>
                            </div>

                            <div className="wrapperbutton">
                                <button type="submit" className="btn btn-primary btn-rounded" >Edit Profile</button>
                            </div>

                        </div>

                    </div>
                </form>
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
                                {image_new}
                                {/* <div className='browse-button'>
                                    <i className='fa fa-pencil' /> */}
                                <div style={{ marginLeft: "200px" }}>
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

                    <button type="button" style={{ float: "right", fontSize: '15.4px', borderRadius: '30px' }} class="btn btn-danger" onClick={this.deleteprofile} >Delete Profile</button>
                    <br></br>
                    <br></br>

                    <div style={{ marginBottom: "100px" }}>
                        <nav class="navbar navbar">

                            <div class="navbar-header">
                            </div>

                            <ul style={{ width: "100%" }} class="nav navbar-nav">

                                <li style={{ width: "25%" }}> <a id="Tweets" onClick={this.selectComponent} style={{ textAlign: "center", borderRadius: "0px", borderRight: 'none', color: "black" }} href="#" class="list-group-item">Tweets</a></li>
                                <li style={{ width: "25%" }}> <a id="Edit Profile" onClick={this.selectComponent} style={{ textAlign: "center", borderRadius: "0px", borderRight: 'none', color: "black" }} href="#" class="list-group-item">Edit Profile</a></li>
                                <li style={{ width: "25%" }}> <a onClick={this.selectComponent} style={{ textAlign: "center", borderRadius: "0px", borderRight: 'none', color: "black" }} href="#" class="list-group-item">Media</a></li>
                                <li style={{ width: "25%" }}> <a id="Likes" onClick={this.selectComponent} style={{ textAlign: "center", borderRadius: "0px", color: "black" }} href="#" class="list-group-item">Likes</a></li>

                            </ul>

                        </nav>
                        {selectedComp}
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
