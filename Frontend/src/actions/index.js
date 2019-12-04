import axios from 'axios';
import ROOT_URL from '../constants.js';
export const LOGIN_USER = "login_user";
export const SIGNUP_USER = "signup_user";
export const GET_PROFILE ="get_profile";
export const GET_USER_PROFILE ="get_user_profile";
//const  EXTRAS= "3.17.191.255:3001";
// const ROOT_URL = "http://localhost:3001";


export function loginuser(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/login`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In get profile response:" + JSON.stringify(res));

            dispatch({
                type: LOGIN_USER,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function signupUser(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${ROOT_URL}/signup`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: SIGNUP_USER,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function getProfile(values, callback) {
    console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/profile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            // console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}

export function getUserProfile(values, callback) {
    console.log(values);

    axios.defaults.withCredentials=true;

    const request = axios
    .get(`${ROOT_URL}/userprofile`,values);

    return (dispatch) =>{
        request.then((res)=>{
            console.log("In get profile response:" + JSON.stringify(res));
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            callback(res);
        })
    }
    
}