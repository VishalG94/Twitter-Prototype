import React from 'react'
import './Messages.css'
let RecieverMessage = props => {
    return (
        <div class='row' style={{ marginLeft: '15px' }}>
            <div class='message-reciever'>{props.message}</div>
        </div>
    )
}

export default RecieverMessage;