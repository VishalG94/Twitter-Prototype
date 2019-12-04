import ROOT_URL from "../../constants";
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import connect from "react-redux/es/connect/connect";
import UserList from '../Search/UserList'
import Tweet from '../Tweet/Tweet'
import FollowersData from './FollowersData'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
class Followers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            following: [],
            followers: [],
            name: "",
            todos: [],
            currentPage: 1,
            todosPerPage: 1,
        }
    }


    componentWillMount() {

        var email = sessionStorage.getItem('id')
        console.log(email)

        axios.get((ROOT_URL) + '/followers', {
            params: { id: email }
        }).then(response => {
            if (response.status == 200) {
                console.log("Followers Fetched");
                console.log(response.data)
                console.log(response.data.first_name)
                let temp = (response.data)
                // alert(temp)
                this.setState({
                    following: temp.following,
                    followers: temp.followedBy,
                    name: temp.first_name,
                    todos: temp.followedBy
                })
                console.log("list of following " + this.state.following)
                // console.log(this.state.followers)
                console.log("list of followers" + this.state.followers)
                console.log("list of name" + this.state.name)
            }
        }).catch(e => {
            console.log("Error in did mount" + e)
        })
    }

    handleClick = event => {
        this.setState(
            {
                currentPage: Number(event.target.id)
            },
            () => {
            }
        )
    }
    render() {

        const { todos, currentPage, todosPerPage } = this.state
        const indexOfLastTodo = currentPage * todosPerPage
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage
        const currentTodos = this.state.todos.slice(indexOfFirstTodo, indexOfLastTodo)
        // console.log(indexOfFirstTodo, indexOfLastTodo)
        console.log(currentTodos)
        console.log(this.state.todos);

        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i)
        }
        console.log(pageNumbers);
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li class="page-item" key={number} onClick={this.handleClick} id={number}><a class="page-link" key={number} onClick={this.handleClick} id={number} href="#">{number}</a></li>

            )
        })

        let details = this.state.followers.map(followers => {
            return (
                <div>
                    <FollowersData key={Math.random} data={followers}></FollowersData>
                </div>
            )
        })


        return (
            <div>
                <div>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <LeftNavbar />
                        </div>
                        <div className='col-sm-7'>
                            <ul>
                                {details}
                            </ul>
                        </div>
                        <div className='col-sm-1' />
                    </div>
                </div>
                <nav aria-label="Page navigation example">

                    <ul className="pagination" id='page-numbers'>
                        {/* {renderPageNumbers} */}
                    </ul>

                </nav>
            </div>
            // <div>{details}</div>
        )
    }
}


function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Followers);