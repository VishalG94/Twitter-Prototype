import ROOT_URL from "../../constants";
import axios from 'axios'
import React, { Component , Fragment } from 'react'
import connect from "react-redux/es/connect/connect";
import UserList from '../Search/UserList'
import Tweet from '../Tweet/Tweet'
import ListData from '../Lists/ListData'
class Followers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: ''
        }
    }


    componentWillMount() {

        var email =sessionStorage.getItem('email')
        console.log(email)

        axios.get((ROOT_URL) + '/followers', {
            params: { email: email }
        }).then(response => {
            if (response.status == 200) {
                console.log("Followers Fetched");
                console.log(response.data)
                this.setState({
                    list:response.data
                })
            alert(this.state.list)
            console.log(this.state.list)
            }
        })
    }

    render()
    {   
        let details = this.state.list.map(list => {
            return (
              <div>
                <ListData key={Math.random} data={list}></ListData>
              </div>
            )
          })
      

        return (
        <div>{details}</div>
        )
    }
    }


function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Followers);