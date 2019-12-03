import React, { Component } from 'react'
import './Suggestions.css'

class Suggestions extends Component{

    constructor(props) {
        super(props)
        this.state = {
            members : []
        }
        this.options = this.options.bind(this);
        this.addMember = this.addMember.bind(this);
      }

      addMember(e){       
        
        if(!this.state.members.includes(e.target.value))
        {
            this.setState({
                members: this.state.members.concat(e.target.value)
            })          
        } 
        setTimeout(()=>{
            sessionStorage.setItem('members',JSON.stringify(this.state.members))         
        },1000)
        
        console.log(this.state.members)
      }

      options(){

        return this.props.results.map(r => (
            // <li key={r.id}>
            //   {r.username}
            // </li>
            <button type="button" class="btn btn-primary btn-sm" value={r.username} onClick={this.addMember}>{r.username}</button>

        ))
      } 
  
//    options = () => props.results.map(r => (
//     // <li key={r.id}>
//     //   {r.username}
//     // </li>
//     <button type="button" class="btn btn-primary btn-sm" value={r.username} onClick={this.addMember}>{r.username}</button>


//   ))

render(){
    
    return(
        <div>
            <ul>{this.options()}</ul>
            <div class="current-members">
                Current Members : {this.state.members.toString()}
            </div>
        </div>
        
    )
}



//   return <ul>{options}</ul>
}

export default Suggestions