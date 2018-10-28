import React, { Component } from 'react';
import './App.css';
import Header from "./Header"
import Shelf from "./Shelf"

class App extends Component {
  state = {
    shelves: [
      {name: "Currently Reading"},
      {name: "Want to Read"},
      {name: "Completed"},
      ],
    books: [
      {title: "dummyTitle", shelf: "Currently Reading"},
      {title: "dummyTitle", shelf: "Currently Reading"},
      {title: "dummyTitle", shelf: "Currently Reading"},
      {title: "dummyTitle", shelf: "Want to Read"},
      {title: "dummyTitle", shelf: "Want to Read"},
      {title: "dummyTitle", shelf: "Want to Read"},
      {title: "dummyTitle", shelf: "Want to Read"},
      {title: "dummyTitle", shelf: "Completed"},
      {title: "dummyTitle", shelf: "Completed"},
      {title: "dummyTitle", shelf: "Completed"},
      ]
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
              key={shelf.name}
              books={this.state.books.filter((book) => book.shelf===shelf.name).map((book) => book.title)}
          />
          )})}
      </div>
    );
  }
}

export default App;
