import React, { Component } from 'react'
import ListElement from '../UI-Elements/ListElement/ListElement'
import Search from '../UI-Elements/Search/Search';
import axios from 'axios'

class Users extends Component {

    state = {
        placeholder: 'Search by user name...',
        searchPhrase: '',
        users: [],
        filteredUsers: []
    }

    searchInputChangeHandler = (event) => {
        const phrase = event.target.value;
        this.setState({
            searchPhrase: phrase
        })

        let filteredList = this.state.users;

        filteredList = filteredList.filter((user => {
            return user.name.toLowerCase().search(phrase.toLowerCase()) !== -1;
        }));

        this.setState({
            filteredUsers: filteredList
        })

    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(users => {
                this.setState({
                    users: users.data,
                    filteredUsers: users.data
                })
            })
    }

    render() {
        let userList = null;

        if (this.state.filteredUsers.length) {
            userList = this.state.filteredUsers.map((user) => {
                return <ListElement name={user.name} key={user.id} index={user.id} filtered={this.state.users.length !== this.state.filteredUsers.length} />
            })
        } else {
            userList = (
                <div>
                    <h3>No users found...</h3>
                    <p>Try to change the search phrase!</p>
                </div>
            )
        }

        return (
            <div>
                <h1>Users list</h1>
                <Search placeholder={this.state.placeholder} searchPhrase={this.state.searchPhrase} change={this.searchInputChangeHandler}/>
                {userList}
            </div>
        )
    }

}

export default Users