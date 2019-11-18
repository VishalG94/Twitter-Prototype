import React from 'react'
import { nominalTypeHack } from 'prop-types'
import './WriteTweet.css'
//import { NEG_ONE } from 'long'

let WriteTweet = props => {
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
          {/* <h4 class='user-name'>
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
          </h4> */}

            {/* <div class="form-group">
                <label for="exampleFormControlTextarea1">What's happening?</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div> */}

            <div class="bg"   >
            {/* <input type="text" placeholder="What's happening?"/> */}
            <textarea  maxlength="280" rows="3" placeholder="       What's happening  "></textarea>
            
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='fa fa-photo fa-2x' />&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
          <button type="button" class="btn btn-outline-primary">Tweet</button>        
          </div>



            {/* <div class="md-form">
            <textarea id="form7" class="md-textarea form-control" rows="3"></textarea>
            <label for="form7">Material textarea</label>
            </div>
             */}
            {/* <div class="md-form">
            <i class="fas fa-pencil-alt prefix"></i>
            <textarea id="form10" class="md-textarea form-control" rows="3"></textarea>
            <label for="form10">Icon Prefix</label>
            </div>  */}

           {/* <div style={{ color: 'black' }}>{props.tweetsDtls.description}</div> */}
        
          <br />
          {/* <img
            class='rounded-circle'
            style={{ borderRadius: '10px' }}
            src={props.tweetsDtls.img}
            width='500px'
            height='250%'
            alt='profile pic'
          /> */}
{/*          
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='far fa-comment fa-2x' />&nbsp;<span style={{fontSize:'15px'}}>{props.tweetsDtls.comments}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='fas fa-retweet fa-2x' />&nbsp;<span style={{ fontSize:'15px'}}>{props.tweetsDtls.retweets}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='far fa-heart fa-2x' />&nbsp;<span style={{fontSize:'15px'}}>{props.tweetsDtls.likes}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class='fas fa-arrow-up fa-2x' /> */}
        </div>
        
      </div>
    </a>
  )
}

export default WriteTweet