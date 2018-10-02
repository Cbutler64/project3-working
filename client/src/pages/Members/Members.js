import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
import FriendCard from "../../components/FriendCard";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
class Members extends Component {
  // Setting our component's initial state
  state = {
    users: [],
    username: "",
    realname: "",
    photo: "",
    gender: "",
    password: "",

  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>{
        this.setState({ users: res.data, username: "", realname: "", photo: "", gender: "",
        password: "", })
        console.log(this.state.users)
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
  goToFriend = id => {
    console.log(id);
    
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.realname) {
      API.saveBook({
        username: this.state.username,
        realname: this.state.realname,
        photo: this.state.photo,
        gender: this.state.gender,
        password: this.state.password,
        
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
      <Nav />
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Vfriend Members</h1>
              </Jumbotron>
              <Wrapper>
              {this.state.users.map(friend => (
                <FriendCard
                goToFriend={this.goToFriend}
                  id={friend._id}
                  key={friend._id}
                  name={friend.username}
                  image={friend.photo}
                  realname={friend.realname}
                  gender={friend.gender}
                />
              ))}
              </Wrapper>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Members;
