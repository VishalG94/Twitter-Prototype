import React from 'react'
import { nominalTypeHack } from 'prop-types'
import './WriteTweet.css'
import axios from 'axios';
import { getProfile } from '../../actions'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import ROOT_URL from '../../constants' 
class WriteTweet extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: "",
      file: null,
      url: null,
      profilepic:''
    }

    this.imagehandleChange = this.imagehandleChange.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitTweet = this.submitTweet.bind(this);
  }

  componentWillMount() {
    this.setState({
        authFlag: false,
        authFailed: false,
        // profilepic: '',

    })

    let temp = sessionStorage.getItem('email')
    console.log(temp);
    let data = { email: temp }
    console.log(data.email)
    this.props.getProfile({ params: data }, (response) => {
        // console.log(this.props.user)
        // console.log(response.data);
        let img = `${ROOT_URL}/images/profile/`
// let img = '/images/profile/'
        
          if (response.data.image) {
              img = img + response.data.image
          } else {
              img = img + 'Twitternew.png'
          }

        this.setState({
            profilepic: img

        })
    });

}

  imagehandleChange(event) {
  //  alert(event.target.files[0])
    this.setState({
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0])
    })
    console.log(this.state.file)
  }

  textChangeHandler = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  submitTweet = (e) => {
    console.log(this.state.file)
    e.preventDefault();
    const body = {
      text: this.state.text,
      email: sessionStorage.getItem('email')
    }
    let dataadd = new FormData();
    dataadd.append('body', JSON.stringify(body));
    
    dataadd.append('image', this.state.file);

    console.log(dataadd);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    console.log(dataadd)
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/writetweet`, dataadd, config)
      .then(response => {
        console.log(response);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log('successfully entered user data')
          this.setState({
            edit: false,
            file: null,
            url: null,
          })
          window.location.reload();
        }
      }).catch((error) => {
        if (error.response) {
          this.setState({
            msg: error.response.data
          })
        }
      });
  }

  render() {

    let userEdit = null;
    if (!this.state.url) {
      <div>
        <img width={"200"} height={"200"} alt={"Smiley face"} src={this.state.url} />
      </div>
    }


    return (
      <li href='#' class='list-group-item'>
        <div class='row'>
          <div class='col-sm-1'>
            <img
              src={this.state.profilepic}
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
                onChange={this.textChangeHandler}
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
                  accept='image/*'
                  name='image'
                  style={{ display: 'none' }}
                  onChange={this.imagehandleChange}
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
                onClick={this.submitTweet}
                class='btn btn-primary'
              >
                Tweet
              </button>
              {userEdit}
            </div>
            <br />
          </div>
        </div>
      </li>
    )
  }
}

// export default WriteTweet

function mapStateToProps(state) {
  return {
      user: state.user
  };
}

export default connect(mapStateToProps, { getProfile })(WriteTweet);