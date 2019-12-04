import React, { Component } from 'react';
import './Dashboard.css'
import Profile from "../Profile/Profile";
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import cookies from 'react-cookies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Redirect from "react-router-dom/es/Redirect";
import connect from "react-redux/es/connect/connect";
import Messages from '../Messages/Messages';
import Tweet from '../Tweet/Tweet'
import Barday from './Barday'
import GraphLikes from './GraphLikes'
import GraphRetweet from './GraphRetweet'
import GraphTweet from './GraphTweet'
import BarProfileView from './BarProfileView'
import DashNavbar from '../LeftNavbar/DashNavBar';
class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //userid : cookies.load('userid')
      userid: this.props.user._id
    }
  }



  render() {
    return (

      <div>
        <div>
          <div className='row'>
            <div className='col-sm-2'>
              {/* <LeftNavbar /> */}
              <DashNavbar />
            </div>
          </div>
          <div class='split-center-dashboard'>
            <div className='row'>
              <div class='col-sm-4'>
                <GraphLikes></GraphLikes>
              </div>
              <div class='col-sm-4'>
                <GraphRetweet></GraphRetweet>
              </div>
              <div class='col-sm-4'>
                <GraphTweet></GraphTweet>
              </div>

            </div>
            <div className='row'>
              <div class='col-sm-12'>
                <label style={{marginLeft:'28%'}}>Tweets per day</label>
                <Barday></Barday>
              </div>
            </div>
            <div className='row'>
              <div style={{marginBottom:'100px'}} class='col-sm-12'>
              <label style={{marginLeft:'28%'}}>Profile views per day</label>
                <BarProfileView></BarProfileView>
              </div>
            </div>
          </div>
          <div className='col-sm-1' />
          {/* </div> */}
        </div>
      </div>
      // <div>
      //     {/* <Navbarhome/> */}
      //     <div className="container-dashboard">
      //         <nav>
      //             <div className="nav nav-tabs" id="nav-tab" role="tablist">
      //                 <a className={ "nav-item nav-link " + ((this.props.match.params.page === "inbox") && ("active"))  }><Link to={"/Dashboard/inbox/" + this.props.user._id}>Messages</Link></a>
      //                 <a className={ "nav-item nav-link " + ((this.props.match.params.page === "tweets") && ("active"))  }><Link to={"/Dashboard/mytrips/" + this.props.user._id}>My Tweets</Link></a>
      //                 <a className={ "nav-item nav-link " + ((this.props.match.params.page === "profile") && ("active"))  }><Link to={"/Dashboard/profile/" + this.props.user._id}>Profile</Link></a>
      //                 <a className={ "nav-item nav-link " + ((this.props.match.params.page === "retweets") && ("active"))  }><Link to={"/Dashboard/account/" + this.props.user._id}>Retweets</Link></a>
      //             </div>
      //         </nav>
      //         <div className="tab-content" id="nav-tabContent">
      //             { (this.props.match.params.page === "inbox") && (<div className="tab-pane fade show active" id="nav-Inbox" role="tabpanel"
      //                  aria-labelledby="nav-Inbox-tab"><Messages/>
      //             </div>) }
      //             { (this.props.match.params.page === "tweets") && (<div className="tab-pane fade show active" id="nav-trips" role="tabpanel"
      //                  aria-labelledby="nav-trips-tab"><Tweet userid={this.props.user._id} />
      //             </div>)}
      //             { (this.props.match.params.page === "profile") && (<div className="tab-pane fade show active" id="nav-profile" role="tabpanel"
      //                  aria-labelledby="nav-profile-tab"><Profile userid={this.props.user._id}/>
      //             </div>)}
      //             {/* { (this.props.match.params.page === "account") && (<div className="tab-pane fade show active" id="nav-Account"role="tabpanel"
      //                 aria-labelledby="nav-profile-tab"><Retw userid={this.props.user._id}/>
      //             </div>)} */}
      //         </div>
      //     </div>




      // </div>
    )
  }
}


function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Dashboard);