import React, { Component } from 'react'
import ListElement from '../UI-Elements/ListElement/ListElement'
import Search from '../UI-Elements/Search/Search';
import axios from 'axios'

class Users extends Component {

    state = {
        placeholder: 'Search by user name...',
        searchPhrase: '',
        users: [],
        filteredUsers: [],
        usersFetched: false
    }

    searchInputChangeHandler = (event) => {

        const phrase = event ? event.target.value : '';
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

    clearSearchPhrase = () => {
        this.searchInputChangeHandler(null)
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(users => {
                this.setState({
                    users: users.data,
                    filteredUsers: users.data,
                    usersFetched: true
                })
            })
    }

    render() {
        let userList = null;

        if (this.state.filteredUsers.length) {
            userList = this.state.filteredUsers.map((user) => {
                return <ListElement name={user.name} key={user.id} index={user.id} filtered={this.state.users.length !== this.state.filteredUsers.length} />
            })
        } else if (this.state.usersFetched) {
            userList = (
                <div>
                    <h3>No users found...</h3>
                    <p>Try to change the search phrase!</p>
                    <button onClick={this.clearSearchPhrase} className="button delete-button">Clear search input</button>
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