import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import { Route, Link } from "react-router-dom";
import Search from "./Search"

class App extends Component {
  state = {
    shelves: [
      {name: "Currently Reading", id: "currentlyReading", books: [],},
      {name: "Want to Read", id: "wantToRead", books: [],},
      {name: "Read", id: "read", books: [],},
      ],
    books: [],
    backupImage: "https://books.google.com/books/content?id=McM8AAAAIAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70w5XYIIoMcVBBRBnKsf_t9knPKbQKU5tvLQRDnkzMGqyicVlSJyHP6BY9na2pR_7ya4sj9h935cfTNKfp5YXDImefP9iWDkiZ00dNkj-yoyW-E9EQ",
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
  handleBookMove = (book, newShelf) => {
    // console.log("Book:", book);
    if (newShelf!=="none") {
      this.setState((prevState) => ({
        books: prevState.books.map((bk) => {
          if (bk.id===book.id) {
            return Object.assign({}, bk, {"shelf": newShelf});
          } else {
            return bk;
          }
        })
      }), this.updateShelves);
    } else {
      this.setState((prevState) => ({
        books: prevState.books.filter((bk) => bk.id!==book.id)
      }), this.updateShelves);
    }
    BooksAPI.update(book, newShelf);
  }
  updateShelves = () => {
    this.setState((prevState) => ({
        shelves: prevState.shelves.map((shelf) => ({"name": shelf.name, "id": shelf.id, books: prevState.books.filter((bk) => bk.shelf===shelf.id)}))
      }));
  }
  render() {
    return (
      <div className="App">
        <Header 
          className="app-header"
        />
        <Route exact path="/" render={() => {
          return (
            <div className="shelf-component-container">
              {this.state.shelves.map(shelf => {
                return (
                  <Shelf 
                    className="shelf"
                    title={shelf.name}
                    key={shelf.id}
                    books={this.state.books.filter((book) => book.shelf===shelf.id)}
                    handleBookMove={this.handleBookMove}
                    backupImage={this.state.backupImage}
                  />
                );
              })}
              <div className="search-btn-container">
                <Link to="/search">Search</Link>
              </div>
            </div>
          );
        }}>
        </Route>
        <Route path="/search" render={() => 
          <Search
            className="search-component-container"
            handleBookMove={this.handleBookMove}
            books={this.state.books}
            APIsearch={BooksAPI.search}
            backupImage={this.state.backupImage}
          >
        </Search>
        }>
        </Route>
      </div>
    );
  }
}

export default App;
