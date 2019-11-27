import React from 'react'

class ActiveChat extends React.Component {
    // call the constructor method
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
    }

    recieverMsg = (e) => {
        e.preventDefault();
        sessionStorage.setItem('reciever', e.target.id)
        window.location.reload();
    }


    render() {
        return (
            <a href="#" style={{ fontSize: '15.4px', fontWeight: '700', color: 'black', borderRight: 'none', borderRadius: '0px 0px 0px 0px ', borderLeft: 'none' }} class="list-group-item list-group-item-action" id={this.props.person} onClick={this.recieverMsg}>@{this.props.person}</a>
        )
    }
}
export default ActiveChat;