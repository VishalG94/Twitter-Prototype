import ROOT_URL from "../../constants";
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import connect from "react-redux/es/connect/connect";
import UserList from '../Search/UserList'
import Tweet from '../Tweet/Tweet'
import FollowingData from './FollowersData'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import Pagination from "../../Paginate/Pagination"
class Following extends Component {
  constructor(props) {
    super(props)

    this.state = {
      following: [],
      followers: [],
      name: "",
      currenPage: 1,
      sectionsPerPage: 2,
    }
  }


  componentWillMount() {

    var email = sessionStorage.getItem('id')
    console.log(email)

    axios.get((ROOT_URL) + '/followers', {
      params: { id: email }
    }).then(response => {
      if (response.status == 200) {
        console.log("Followers Fetched");
        // alert(response.data)

        let temp = (response.data)
        // alert(temp)
        this.setState({
          following: temp.following,
          followers: temp.followedBy,
          name: temp.first_name
        })
      }
    }).catch(e => {
      console.log("Error in did mount" + e)
    })
  }

  render() {

    const indexOfLastSection = this.state.currenPage * this.state.sectionsPerPage;
    const indexOfFirstSection = indexOfLastSection - this.state.sectionsPerPage;
    const currenSections = this.state.following.slice(indexOfFirstSection, indexOfLastSection);

    const paginate = (pageNumber) => {
      this.setState({
        currenPage: pageNumber
      })
    }


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
        {/* <Pagination postsPerPage={this.state.sectionsPerPage} totalPosts={this.state.following.length} paginate={paginate} /> */}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Following);