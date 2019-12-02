import React,{ Component } from 'react';
import './Dashboard.css'
import Profile from "../Profile/Profile";

import cookies from 'react-cookies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Redirect from "react-router-dom/es/Redirect";
import connect from "react-redux/es/connect/connect";
import Messages from '../Messages/Messages';
import Tweet from '../Tweet/Tweet'
import UserTweets from '../UserTweets/UserTweets'
import UserLikes from '../UserTweets/UserLikes'
import LeftNavbar from '../LeftNavbar/LeftNavbar';

 class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            userid : this.props.user._id,
            component:'Tweets'
        }
    }

   

    render()
    {
            return (


                
                <div>

                <div className="col-sm-2">
                    <LeftNavbar />
                </div>

                <div class='split-center_new_dash'>
                <nav class="navbar navbar">
                            
                            <div class="navbar-header">
                            </div>

                            <ul style={{width:"100%" }} class="nav navbar-nav">

                                <li style={{width:"25%"}}> <a id="Tweets" onClick={this.selectComponent} style={{textAlign:"center",borderRadius:"0px", borderRight:'none',color : "black"}} href="/userprofile/tweets" class="list-group-item">Tweets</a></li>
                                <li style={{width:"25%"}}> <a style={{textAlign:"center", borderRadius:"0px",borderRight:'none', color : "black"}} href="/followers" class="list-group-item">Followers</a></li>
                                <li style={{width:"25%"}}> <a style={{textAlign:"center", borderRadius:"0px",borderRight:'none', color : "black"}} href="/graph" class="list-group-item">Graph</a></li>
                                <li style={{width:"25%"}}> <a id="Likes" onClick={this.selectComponent} style={{textAlign:"center", borderRadius:"0px", color : "black"}} href="/userprofile/likes" class="list-group-item">Likes</a></li>
                                
                            </ul>

                    </nav>
                    </div>
                    </div>
            )
         }
    }


function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Dashboard);