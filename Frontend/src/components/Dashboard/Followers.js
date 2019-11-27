import ROOT_URL from "../../constants";
import axios from 'axios'
import React, { Component , Fragment } from 'react'
import connect from "react-redux/es/connect/connect";
import UserList from '../Search/UserList'
import Tweet from '../Tweet/Tweet'
class Followers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: ''
        }
    }


    componentWillMount() {

        var user = JSON.parse(sessionStorage.getItem('userDtls'));
        let follow = user.followedBy
        console.log(user)
        console.log(follow)

        axios.get((ROOT_URL) + '/followers', {
            params: { follow: follow }
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
        return (
        <div>{this.state.list}</div>
        )
    }
    }


function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Followers);