import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ROOT_URL from "../../constants"
import './ListData.css'
import EditList from "./EditList";
import { getProfile } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: ''
        }
    }

    componentWillMount() {
        let email = this.props.data.owner.email;
        console.log(email);
        let data = { email: email }
        // alert(data.email)
        this.props.getProfile({ params: data }, (response) => {
            // console.log(this.props.user)
            // alert(response.data);
            console.log(this.props.user)
            console.log(response.data);

            let img = `${ROOT_URL}/images/profile/`
              if (response.data.image) {
                  img = img + response.data.image
              } else {
                  img = img + 'Twitternew.png'
              }
  
              this.setState({
                  pic: img
              });
            // let img = '/images/profile/' + response.data.image

            // axios.post(`${ROOT_URL}/userimage`, data).then(response => {
            //     //   alert('Axios get image:'+ response.data)
            //     this.setState({
            //         pic: 'data:image/png;base64, ' + response.data
            //     })
            // })

        })
    }

    Search = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('SelectedProfileId')
        sessionStorage.removeItem('SelectedUserProfile')
        sessionStorage.setItem('SelectedUserProfileId', e.target.id)
        sessionStorage.setItem('SelectedUserProfile', e.target.name)

        let x = sessionStorage.getItem('email')
        let y = sessionStorage.getItem('SelectedUserProfile')
        if (x != y) {
            console.log(x);
            window.location.replace('/profile');
        }
        else {
            window.location.replace('/userprofile')
        }
    }

    render() {

        var newdetails = null;

        newdetails = 
                <div>
                    {/* <h1>Already Not liked</h1> */}
                    <Link to={{ pathname:'/listdetails',  state:{id : this.props.data._id, owner:this.props.data.owner }}}
                      class='list-group-item' >
                  
                        <div class='row'>
                            <div class='col-sm-1'>
                                <img
                                    src={this.state.pic}
                                    class='preview-img'
                                    width='50'
                                    height='50'
                                    alt='profile pic'
                                />
                            </div>
                            {/* <div class='col-sm-1'></div> */}
                            <div class='col-sm-11'>
                                <h4 class='user-name'>
                                <a href='/profile'
                                    id={this.props.data.owner._id} name={this.props.data.owner.email} onClick={this.Search}>
                                    {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}</a>
                                <span
                                    style={{
                                        fontWeight: 'normal',
                                        color: 'grey'
                                    }}
                                >
                                    @{this.props.data.owner.username}
                                </span>
                                <span />

                                {/* <span
                                        style={{
                                            fontWeight: 'normal',
                                            color: 'grey'
                                        }}
                                    >
                                        . {this.props.data.time}
                                    </span> */}


                            </h4>
                            <div id="listname" style={{ color: 'black' }}>   {this.props.data.name}</div>
                            <br />

                            <div id="listdescription" style={{ color: 'grey' }}>   {this.props.data.description}</div>
                            <br />

                            <span>
                                Members : {this.props.data.members.length} &nbsp;&nbsp;
                                    Subscribers : {this.props.data.subscribers.length}
                            </span>


                            {/* <i class='fas fa-arrow-u  p fa-2x' /> */}

                        </div>
                    </div>
                </Link>

            </div>


        return (
            <Fragment>

                {newdetails}

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, { getProfile })(
    reduxForm({ form: 'streamLogin', })(ListData))
