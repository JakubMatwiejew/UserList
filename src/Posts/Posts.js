import React, { Component } from 'react'
import ListElement from '../UI-Elements/ListElement/ListElement'
import Search from '../UI-Elements/Search/Search';
import axios from 'axios'
import LoadingState from '../UI-Elements/LoadingState/LoadingState';
import Button from '../UI-Elements/Button/Button';

class Posts extends Component {

    state = {
        placeholder: 'Search by post title...',
        searchPhrase: '',
        posts: [],
        filteredPosts: [],
        postsFetched: false,
        loadingState: 'Fetching post list...'
    }

    searchInputChangeHandler = (event) => {
        const phrase = event ? event.target.value : '';
        this.setState({
            searchPhrase: phrase
        })

        this.filterResults(phrase);
    }

    filterResults = (searchPhrase) => {
        let filteredList = this.state.posts;

        filteredList = filteredList.filter((post => {
            return post.title.toLowerCase().search(searchPhrase.toLowerCase()) !== -1;
        }));

        this.setState({
            filteredPosts: filteredList
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

    fetchPostList = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(posts => {
                // setTimeout to simulate long api response and show loading state
                setTimeout(() => {
                    this.setState({
                        posts: posts.data,
                        filteredPosts: posts.data,
                        postsFetched: true
                    })
                }, 2000)
            })
            .catch(err => {
                this.setState({
                    loadingState: 'Error while fetching posts...'
                })
            })
    }

    componentDidMount() {
        this.fetchPostList();
    }

    render() {
        let postList = null;
        let noResults = null;
        let loadingState = null;
        let search = null;

        if (this.state.filteredPosts.length) {
            postList = this.state.filteredPosts.map((post) => {
                return <ListElement clicked={() => this.updateSearchPhrase(post.title)} name={post.title} key={post.id} index={post.id} filtered={this.state.posts.length !== this.state.filteredPosts.length} />
            })
        } 

        if (this.state.postsFetched) {
            search = <Search warning={this.state.filteredPosts.length} autofocus={this.state.postsFetched} placeholder={this.state.placeholder} searchPhrase={this.state.searchPhrase} change={this.searchInputChangeHandler}/>
        }

        if (!this.state.filteredPosts.length && this.state.postsFetched) {
            noResults = (
                <div>
                    <h3>No posts found...</h3>
                    <p>Try to change the search phrase!</p>
                    <Button clicked={this.clearSearchPhrase} type="delete-button" text="Clear search input"/>
                </div>
            )
        }

        if (!this.state.postsFetched) {
            loadingState = <LoadingState loadingState={this.state.loadingState}/>
        }

        return (
            <div>
                <h1>Posts list</h1>
                {search}
                {loadingState}
                {postList}
                {noResults}
            </div>
        )
    }

}

export default Posts