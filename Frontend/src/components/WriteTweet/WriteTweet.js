import React from 'react'
import { nominalTypeHack } from 'prop-types'
import './WriteTweet.css'
import { NEG_ONE } from 'long'

let WriteTweet = props => {
  return (
    <li href='#' class='list-group-item'>
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
          <div class='bg'>
            <textarea
              maxlength='280'
              rows='1'
              //   width='50%'
              placeholder="What's happening  "
            />
            <i class='fa fa-photo fa-2x' />
            <button
              type='button'
              style={{
                float: 'right',
                outline: 'none',
                border: 'none',
                backgroundColor: '#4285f4'
              }}
              class='btn btn-primary'
            >
              Tweet
            </button>
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
    </li>
  )
}

export default WriteTweet
