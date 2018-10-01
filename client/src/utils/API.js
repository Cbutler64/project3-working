import axios from "axios";
const youTuBeApiKey = "AIzaSyCy2Pkt1JzTyRV-mhGHqpARFbovXj-auME";

// Constructing a queryURL using the API
const queryURL = "https://www.googleapis.com/youtube/v3/search?" +
  "&part=snippet" +
  "&type=video" +
  "&q=" 
  
  const queryURL2 = "&maxResults=10" +
  "&key=" +
  youTuBeApiKey;


export default {
  searchAPI: function (query) {
    console.log(query)
    return axios.get(queryURL + query + queryURL2);
  },

  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  getBookName: function (username) {
    return axios.get("/api/books/name/" + username);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  }
};
