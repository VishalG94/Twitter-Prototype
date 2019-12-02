import React from 'react'

let DisabledChat = props => {
    return (
        <a href="#" style={{ fontSize: '15.4px', fontWeight: '700', borderRight: 'none', borderRadius: '0px 0px 0px 0px ', borderLeft: 'none' }} class="list-group-item list-group-item-action disabled">@{props.person}</a>
    )
}

export default DisabledChat;