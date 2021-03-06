import React, { Component } from 'react'
import ListElement from '../UI-Elements/ListElement/ListElement'
import Search from '../UI-Elements/Search/Search';
import axios from 'axios'
import LoadingState from '../UI-Elements/LoadingState/LoadingState';
import Button from '../UI-Elements/Button/Button';

class Users extends Component {

    state = {
        placeholder: 'Search by user name...',
        searchPhrase: '',
        users: [],
        filteredUsers: [],
        usersFetched: false,
        loadingState: 'Fetching user list...'
    }

    searchInputChangeHandler = (event) => {
        const phrase = event ? event.target.value : '';
        this.setState({
            searchPhrase: phrase
        })

        this.filterResults(phrase);
    }

    filterResults = (searchPhrase) => {
        let filteredList = this.state.users;

        filteredList = filteredList.filter((user => {
            return user.name.toLowerCase().search(searchPhrase.toLowerCase()) !== -1;
        }));

        this.setState({
            filteredUsers: filteredList
        })
    }

    updateSearchPhrase = (phrase) => {
        this.setState({
            searchPhrase: phrase
        })
        this.filterResults(phrase);
    }

    clearSearchPhrase = () => {
        this.searchInputChangeHandler(null)
    }

    fetchUserList = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(users => {
                // setTimeout to simulate long api response and show loading state
                setTimeout(() => {
                    this.setState({
                        users: users.data,
                        filteredUsers: users.data,
                        usersFetched: true
                    })
                }, 2000)
            })
            .catch(err => {
                this.setState({
                    loadingState: 'Error while fetching users...'
                })
            })
    }

    componentDidMount() {
        this.fetchUserList();
    }

    render() {
        let userList = null;
        let noResults = null;
        let loadingState = null;
        let search = null;

        if (this.state.filteredUsers.length) {
            userList = this.state.filteredUsers.map((user) => {
                return <ListElement clicked={() => this.updateSearchPhrase(user.name)} name={user.name} key={user.id} index={user.id} filtered={this.state.users.length !== this.state.filteredUsers.length} />
            })
        } 

        if (this.state.usersFetched) {
            search = <Search warning={this.state.filteredUsers.length} autofocus={this.state.usersFetched} placeholder={this.state.placeholder} searchPhrase={this.state.searchPhrase} change={this.searchInputChangeHandler}/>
        }

        if (!this.state.filteredUsers.length && this.state.usersFetched) {
            noResults = (
                <div>
                    <h3>No users found...</h3>
                    <p>Try to change the search phrase!</p>
                    <Button clicked={this.clearSearchPhrase} type="delete-button" text="Clear search input"/>
                </div>
            )
        }

        if (!this.state.usersFetched) {
            loadingState = <LoadingState loadingState={this.state.loadingState}/>
        }

        return (
            <div>
                <h1>Users list</h1>
                {search}
                {loadingState}
                {userList}
                {noResults}
            </div>
        )
    }

}

export default Users