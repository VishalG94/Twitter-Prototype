import React from 'react'
import { nominalTypeHack } from 'prop-types'
import './WriteTweet.css'

class WriteTweet extends React.Component {
  render () {
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
          <div class='col-sm-11'>
            <div class='bg'>
              <textarea
                maxlength='280'
                rows='1'
                class='writetweet'
                placeholder="What's happening  "
              />
              <br />
              <br />
              <i
                class='fa fa-photo fa-2x'
                onClick={() => this.fileUpload.click()}
              >
                <input
                  type='file'
                  ref={fileUpload => {
                    this.fileUpload = fileUpload
                  }}
                  style={{ display: 'none' }}
                  onChange={this.groupImgUpload}
                />
              </i>
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
            <br />
          </div>
        </div>
      </li>
    )
  }
}

export default WriteTweet
