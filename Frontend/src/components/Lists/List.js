import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ROOT_URL from '../../constants'
import ListData from './ListData'
import EditList from './EditList'

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: [],      
    }
  } 
 
  componentDidMount() {
    var email = sessionStorage.getItem("email")
    console.log("Inside List component");
    axios.get(`${ROOT_URL}/fetchlist`, {
      params: {
        email: email
      }
    })
      .then((response) => {
        console.log("Received response")
        console.log(response)
        //update the state with the response data
        this.setState({
          lists: this.state.lists.concat(response.data)
        });
        sessionStorage.setItem('SelectedUserProfileId',sessionStorage.getItem('id'))
      });
  } 

  render() {
      
    let details = this.state.lists.map(list => {
      return (
        <div>
          <ListData key={Math.random} data={list}></ListData>
        </div>
      )
    })


    return (      

      <Fragment>        

        {details}
        

      </Fragment>

    )
  }
}

export default List
