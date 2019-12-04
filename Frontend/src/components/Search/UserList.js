import React from 'react'

class UserList extends React.Component {
    // call the constructor method
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
    }

    Search = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('SelectedProfileId')
        sessionStorage.removeItem('SelectedUserProfile')
        sessionStorage.setItem('SelectedUserProfileId', e.target.id)
        sessionStorage.setItem('SelectedUserProfile', e.target.name)
        
        let x= sessionStorage.getItem('email')
        let y = sessionStorage.getItem('SelectedUserProfile')
        if(x!=y){
        console.log(x);
        window.location.replace('/profile');
        }
        else{
            window.location.replace('/userprofile')
        }
    }


    render() {
        return (
            <a href="#" style={{ fontSize: '15.4px', fontWeight: '700', color: 'black', borderRadius: '0px 0px 0px 0px '}} class="list-group-item list-group-item-action" id={this.props.person._id} name={this.props.person.email} onClick={this.Search}>@{this.props.person.username}</a>
        )
    }
}
export default UserList;