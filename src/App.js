import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import { Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    shelves: [
      {name: "Currently Reading", id: "currentlyReading", books: [],},
      {name: "Want to Read", id: "wantToRead", books: [],},
      {name: "Read", id: "read", books: [],},
      ],
    books: [],
    showSearchPage: false,
  }
  componentDidMount() {
    BooksAPI.getAll()
    .then((data) => {
      this.setState((prevState) => ({
        books: data
      }));
    })
    .then(this.updateShelves);
  }
  handleBookMove = (bookId, newShelf) => {
    this.setState((prevState) => ({
      books: prevState.books.map((book) => {
        if (book.id===bookId) {
          return Object.assign({}, book, {"shelf": newShelf});
        } else {
          return book;
        }
      })
    }), this.updateShelves);
  }
  updateShelves = () => {
    this.setState((prevState) => ({
        shelves: prevState.shelves.map((shelf) => ({"name": shelf.name, "id": shelf.id, books: prevState.books.filter((book) => book.shelf===shelf.id)}))
      }));
    console.log(this.state.books);
    console.log(this.state.shelves);
  }
  render() {
    return (
      <div className="App">
        <Header 
          className="app-header"
        />
        <Route exact path="/" render={() => {
          return this.state.shelves.map((shelf) => {
            return (
              <Shelf 
                className="shelf"
                title={shelf.name}
                key={shelf.id}
                books={this.state.books.filter((book) => book.shelf===shelf.id)}
                handleBookMove={this.handleBookMove}
            />
            )});
        }}>
          {}
        </Route>
        <Route path="/search" render={() => 
          <h1>Search Page</h1>
          }>
        </Route>
      </div>
    );
  }
}

export default App;
