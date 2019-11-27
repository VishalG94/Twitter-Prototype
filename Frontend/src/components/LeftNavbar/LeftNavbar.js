import React from 'react'

class LeftNavbar extends React.Component {
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
            <a href='/search' className='navLink'>
              <i class='fas fa-hashtag' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Explore</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/messages' className='navLink'>
              <i class='far fa-envelope' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Messages</span>
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
            <a href='/lists' className='navLink'>
              <i class='far fa-list-alt' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Lists</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/userprofile' className='navLink'>
              <i class='far fa-user' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Profile</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/dashboard' className='navLink'>
              <i class='fas fa-chart-line' />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className='tab'>Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
      // </div>
    )
  }
}

export default LeftNavbar
