export default function isAuthenticated() {
    return ( sessionStorage.getItem('email') ? true : false )
  }