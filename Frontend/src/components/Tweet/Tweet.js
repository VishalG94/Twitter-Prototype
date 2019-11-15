import React from 'react'

let Tweet = props => {

    let hasImageTag = null
    if (props.tweetsDtls.img) {
        hasImageTag = (
            <div>
                <img
                    class='rounded-circle'
                    style={{ borderRadius: '10px' }}
                    src={props.tweetsDtls.img}
                    width='500px'
                    height='250%'
                    alt='profile pic'
                />
                <br />
                <br />
            </div>
        )
    }

    return (
        <a href='#' class='list-group-item'>
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
                        {props.tweetsDtls.name}
                        <span
                            style={{
                                fontWeight: 'normal',
                                color: 'grey'
                            }}
                        >
                            {props.tweetsDtls.handler}
                        </span>
                        <span />
                        <span
                            style={{
                                fontWeight: 'normal',
                                color: 'grey'
                            }}
                        >
                            . {props.tweetsDtls.time}
                        </span>
                    </h4>
                    <div style={{ color: 'black' }}>{props.tweetsDtls.description}</div>
                    <br />
                    {hasImageTag}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='far fa-comment fa-2x' />&nbsp;<span style={{ fontSize: '15px' }}>{props.tweetsDtls.comments}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='fas fa-retweet fa-2x' />&nbsp;<span style={{ fontSize: '15px' }}>{props.tweetsDtls.retweets}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='far fa-heart fa-2x' />&nbsp;<span style={{ fontSize: '15px' }}>{props.tweetsDtls.likes}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='fas fa-arrow-up fa-2x' />
                </div>
            </div>
        </a>
    )
}

export default Tweet