import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        sessionStorage.clear();
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    {/* <li><Link to="/buyerprofile"><span class="glyphicon glyphicon-log-in"></span> Profile</Link></li> */}
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/signup"><span class="glyphicon glyphicon-log-in"></span>Sign up</Link></li>
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        // let disableFeatures=null;
        if (cookie.load('cookie')) {

            redirectVar = <Redirect to="/home" />

        }


        return (
            <div>
                {/* {redirectVar} */}
                <nav class="navbar navbar-default" style={{backgroundColor:"#fafafa"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            {/* <img src="https://www.google.com/search?q=twitter+logo&rlz=1C5CHFA_enUS874US874&sxsrf=ACYBGNQ44ONDYiyqOMI3rlO33nhCCVXegQ:1573512355865&tbm=isch&source=iu&ictx=1&fir=IhkHN4rOsp0cfM%253A%252C9CDaL1WtY3IZ0M%252C_&vet=1&usg=AI4_-kSXKdrmIUzQk0f8uMJmbhmJALHvIg&sa=X&ved=2ahUKEwjliJWonuPlAhXSOn0KHcvTB_oQ9QEwAHoECAcQJw#imgrc=IhkHN4rOsp0cfM:" class="navbar-brand" style={{color:"red", fontWeight:"normal", fontSize: "26px", fontFamily:"Impact"}} href="/"></img> */}
                            {/* <a class="navbar navbar-brand" href="#"> */}
                            {/* <img src="../img/Twitternew.jpg" /> */}
                            {/* </a> */}
                            <img
                    //   class='preview-img'
                      src={require('../img/Twitternew.jpg')}
                    //   src={this.state.img}
                      alt='Preview Image'
                      width='50'
                      height='50'
                    />
                        </div>
                        {/* <ul class="nav navbar-nav">
                            <li class="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/create">Add a Book</Link></li>
                            <li><Link to="/delete">Delete a Book</Link></li>
                        </ul> */}
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;