import React from 'react'

class DashNavbar extends React.Component {
  render() {
    return (
      // <div class='col-sm-2'>
      <div>
        <h2>
          <span
            style={{
              marginLeft: '10px',
              color: '#0070eb',
              alighText: 'right'
            }}
          >
            Your account
          </span>
        </h2>
        <ul style={{ listStyleType: 'none' }}>
          <li className='li-profile'>
            <a href='/home' className='navLink active'>
              <i class='fas fa-home' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Home</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/userprofile' className='navLink'>
              <i class='fas fa-hashtag' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Profile</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/userretweets' className='navLink'>
              <i class='far fa-envelope' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Retweets</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/bookmarks' className='navLink'>
              <i class='far fa-bookmark' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Bookmarks</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/following' className='navLink'>
              <i class='far fa-user' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Following</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/followers' className='navLink'>
              <i class='fas fa-chart-line' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Followers</span>
            </a>
          </li>
        </ul>
      </div>
      // </div>
    )
  }
}

export default DashNavbar
