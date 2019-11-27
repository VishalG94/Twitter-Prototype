import React,{ Component } from 'react';
import './Dashboard.css'
import Profile from "../Profile/Profile";

import cookies from 'react-cookies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Redirect from "react-router-dom/es/Redirect";
import connect from "react-redux/es/connect/connect";
import Messages from '../Messages/Messages';
import Tweet from '../Tweet/Tweet'

 class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid : this.props.user._id
        }
    }

    render()
    {
        
            return (
                <div>
                    <nav class="navbar navbar-inverse">
                            <div class="container-fluid">
                                <div class="navbar-header">
                                </div>

                                <ul class="nav navbar-nav">

                                    <li> <a href="/followers" class="list-group-item">Followers</a></li>
                                    <li> <a href="/userprofile/tweets" class="list-group-item">Tweets</a></li>
                                    <li> <a href="#" class="list-group-item">Media</a></li>
                                    <li> <a href="/userprofile/likes" class="list-group-item">Likes</a></li>
                                    {/* <button class="btn btn-outline-success" onclick={this.editprofilebutton} type="button">Edit Profile</button> */}

                                </ul>
                            </div>

                        </nav>
                    
                </div>
            )
         }
    }


function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Dashboard);