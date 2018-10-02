import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Hero from "../../components/Hero";
import Nav from "../../components/Nav";
import SearchForm from "../../components/SearchForm";
import Youtube from '../../components/Youtube';
// import ModalPop from "../../components/Modal"


class Home extends Component {
  // Setting our component's initial state

  state = {
    apiResults: [],
    searchQuery: "",
    user: [],
    realname: "",
    photo: "",
    gender: "",
    currentUserID: ""

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    // this.setState({ currentuserID: localStorage.getItem("userID") })
    //console.log(this.state.currentUserID)
    // console.log(localStorage.getItem("userID"))
    this.loadUser(localStorage.getItem("userID"));
  }
  // Loads all User  and sets them to this.state.User
  loadUser = (id) => {
    API.getBook(id)
      .then(res => {
        this.setState({ user: res.data, username: res.data.realname, realname: res.data.realname, photo: res.data.photo, gender: res.data.gender, currentuserID: res.data._id, search: "", apiResults: [],})
        console.log(this.state.user)
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchYoutube = query => {
    console.log(query)
    API.searchAPI(query)
      .then(res => {
        this.setState({ apiResults: res.data.items })
        console.log(this.state.apiResults);
      })
      .catch(err => console.log(err));
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchYoutube(this.state.searchQuery);
    // if (this.state.username && this.state.password) {
    //   API.getBooks()
    //     .then(res =>
    //       this.setState({ users: res.data })
    //     )
    //     .catch(err => console.log(err));
    // }
  };

  render() {
    return (
      <div>
      
        <Nav userLogged={this.state.user.username} />
        <Hero  backgroundImage="https://coolbackgrounds.io/images/backgrounds/sea-edge-311c5cd5.png">
              <h1>Hi {this.state.user.username}! Start browsing </h1>
              
            </Hero>
    <Container>
      
      <Col size="md-12">
     
        <h4 className="text-center text-white" >Dispaly Stuff Here</h4>
        <SearchForm
          searchQuery={this.state.searchQuery}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <Container>
        
        {this.state.apiResults.length ? (
              <List>
                {this.state.apiResults.map(result => (
                  <ListItem key={result.id.videoId}>
                    <Youtube src={result.id.videoId}></Youtube>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          
     
          
         
          
     
        </Container>
      </Col>
     
    </Container>
      </div>
    );
  }
}

export default Home;