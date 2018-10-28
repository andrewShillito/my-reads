import React, { Component } from 'react';
import './App.css';
import Header from "./Header"
import Shelf from "./Shelf"
import * as BooksAPI from "./BooksAPI"

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
      this.setState(() => ({
        books: data
      }))
    })
  }
  render() {
    return (
      <div className="App">
        <Header 
          className="app-header"
        />
        {this.state.shelves.map((shelf) => {
          return (
            <Shelf 
              className="shelf"
              title={shelf.name}
              key={shelf.id}
              books={this.state.books.filter((book) => book.shelf===shelf.id)}
          />
          )})}
      </div>
    );
  }
}

export default App;
