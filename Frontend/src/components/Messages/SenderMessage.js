import React from 'react'
import './Messages.css'
let SenderMessage = props => {
    return (
        <div class='row' style={{ marginRight: '15px' }}>
            <div class='message-sender'>{props.message}</div>
        </div>
    )
}

export default SenderMessage;