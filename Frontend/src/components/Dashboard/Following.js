import ROOT_URL from "../../constants";
import axios from 'axios'
import React, { Component , Fragment } from 'react'
import connect from "react-redux/es/connect/connect";
import UserList from '../Search/UserList'
import Tweet from '../Tweet/Tweet'
import FollowingData from './FollowersData'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
class Following extends Component {
    constructor(props) {
        super(props)

        this.state = {
           following:[],
           followers:[],
           name: ""
        }
    }


    componentWillMount() {

        var email =sessionStorage.getItem('id')
        console.log(email)

        axios.get((ROOT_URL) + '/followers', {
            params: { id: email }
        }).then(response => {
            if (response.status == 200) {
                console.log("Followers Fetched");
                console.log(response.data)
                console.log(response.data.first_name)
                let temp = (response.data)
                // alert(temp)
                this.setState({
                   following : temp.following,
                   followers : temp.followedBy ,
                   name : temp.first_name
                })
                console.log("list of following " + this.state.following)
            // console.log(this.state.followers)
                console.log("list of followers" + this.state.followers)
                console.log("list of name" + this.state.name) 
                       } 
        }).catch(e => {
            console.log("Error in did mount" + e)
        })
    }

    render()
    {   
        let details = this.state.following.map(following => {
            return (
              <div>
                <FollowingData key={Math.random} data={following}></FollowingData>
              </div>
            )
          })
      

        return (
            <div>
        <div>
          <div className='row'>
            <div className='col-sm-2'>
              <LeftNavbar />
            </div>
            <div className='col-sm-7'>
              <ul>
                {details}
              </ul>
            </div>
            <div className='col-sm-1' />
          </div>
        </div>
      </div>
        // <div>{details}</div>
        )
    }
    }


function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Following);