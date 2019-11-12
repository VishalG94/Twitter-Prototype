import React from 'react'
// import './Button.css'

class BuyerOwnerNav extends React.Component {
  render () {
    // console.log(this.props)
    return (
      <div>
        <h2>
          <span style={{ marginLeft: '10px', alighText: 'right' }}>
            Your account
          </span>
        </h2>
        <ul style={{ listStyleType: 'none' }}>
          <li className='li-profile'>
            <a href='/home' className='navLink active'>
              <span className='tab'>
              Home
              </span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/explore' className='navLink'>
              <span className='tab'>Explore</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/messages' className='navLink'>
              <span className='tab'>Messages</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/bookmarks' className='navLink'>
              <span className='tab'>Bookmarks</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/lists' className='navLink'>
              <span className='tab'>Lists</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/profile' className='navLink'>
              <span className='tab'>Profile</span>
            </a>
          </li>
          <li className='li-profile'>
            <a href='/d ashboard' className='navLink'>
              <span className='tab'>Dashboard</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
// console.log("Inside search: ",this.props);

export default BuyerOwnerNav
