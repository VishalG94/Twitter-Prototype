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
            //userid : cookies.load('userid')
            userid : this.props.user._id
        }
    }

    render()
    {
        
            return (
                <div>
                    {/* <Navbarhome/> */}
                    <div className="container-dashboard">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "inbox") && ("active"))  }><Link to={"/Dashboard/inbox/" + this.props.user._id}>Messages</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "tweets") && ("active"))  }><Link to={"/Dashboard/mytrips/" + this.props.user._id}>My Tweets</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "profile") && ("active"))  }><Link to={"/Dashboard/profile/" + this.props.user._id}>Profile</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "retweets") && ("active"))  }><Link to={"/Dashboard/account/" + this.props.user._id}>Retweets</Link></a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            { (this.props.match.params.page === "inbox") && (<div className="tab-pane fade show active" id="nav-Inbox" role="tabpanel"
                                 aria-labelledby="nav-Inbox-tab"><Messages/>
                            </div>) }
                            { (this.props.match.params.page === "tweets") && (<div className="tab-pane fade show active" id="nav-trips" role="tabpanel"
                                 aria-labelledby="nav-trips-tab"><Tweet userid={this.props.user._id} />
                            </div>)}
                            { (this.props.match.params.page === "profile") && (<div className="tab-pane fade show active" id="nav-profile" role="tabpanel"
                                 aria-labelledby="nav-profile-tab"><Profile userid={this.props.user._id}/>
                            </div>)}
                            {/* { (this.props.match.params.page === "account") && (<div className="tab-pane fade show active" id="nav-Account"role="tabpanel"
                                aria-labelledby="nav-profile-tab"><Retw userid={this.props.user._id}/>
                            </div>)} */}
                        </div>
                    </div>
                </div>
            )
         }
    }


function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Dashboard);