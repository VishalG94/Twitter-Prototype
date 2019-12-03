import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ROOT_URL from "../../constants"
import './ListData.css'
import EditList from "./EditList";


class ListData extends Component {
    constructor(props) {
        super(props);

             
    }

    render() {

        var newdetails = null;

        newdetails = 
                <div>
                    {/* <h1>Already Not liked</h1> */}
                    <Link to={{
                pathname:'/listdetails',
                state:{id : this.props.data._id}
                }}
                      class='list-group-item' >
                  
                        <div class='row'>
                            <div class='col-sm-1'>
                                <img
                                    src={require('../img/Twitternew.png')}
                                    class='preview-img'
                                    width='50'
                                    height='50'
                                    alt='profile pic'
                                />
                            </div>
                            {/* <div class='col-sm-1'></div> */}
                            <div class='col-sm-11'>
                                <h4 class='user-name'>
                                    {this.props.data.owner.first_name + " " + this.props.data.owner.last_name}
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

export default ListData;
