import React from 'react'
import {NavLink} from 'react-router-dom';

class UserListNavbar extends React.Component {
  render () {
    return (
      
      <div>
        <nav class="nav">
               <ul>
               <div className='col-sm-4'>                 
                 <NavLink to={{ pathname:'/userlists',  state:{ username:sessionStorage.getItem('username') }}} activeStyle={{fontweight:"bold",color:"rgba(29,161,242,1.00)"}} activeClassName="active" ><li class="nav nav-tabs" >
                   <div class="labels">
                   <span >Owned</span>
                   </div></li></NavLink>               
               </div>
               <div className='col-sm-4'>                 
                 <NavLink to={{ pathname:'/usersubscribedlist',  state:{ username:sessionStorage.getItem('username') }}} activeStyle={{fontweight:"bold",color:"rgba(29,161,242,1.00)"}} activeClassName="selected"  ><li class="nav nav-tabs" >
                   <div class="labels">
                   <span >Subscribed</span>
                   </div></li></NavLink>               
               </div>
               <div className='col-sm-4'>                 
                 <a href="#" class="selected" ><li class="nav nav-tabs" >
                   <div class="labels">
                   <span >Members</span>
                   </div></li></a>               
               </div>
               </ul>                
            </nav>
      </div>
      
    )
  }
}

export default UserListNavbar
