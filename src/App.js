import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import Search from "./Search"
import SearchButton from "./SearchButton"

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
    BooksAPI.update(book, newShelf);
    book.shelf = newShelf;
    if (newShelf!=="none") {
      this.setState((prevState) => ({
        books: prevState.books.filter(bk => bk.id !== book.id).concat(book)
      }), this.updateShelves);
    } else {
      this.setState((prevState) => ({
        books: prevState.books.filter((bk) => bk.id!==book.id)
      }), this.updateShelves);
    }
  }
  updateShelves = () => {
    this.setState((prevState) => ({
        shelves: prevState.shelves.map((shelf) => ({"name": shelf.name, "id": shelf.id, books: prevState.books.filter((bk) => bk.shelf===shelf.id)}))
      }));
  }
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => {
          return (
            <div className="shelf-component-container">
              <Header/>
              {this.state.shelves.map(shelf => {
                return (
                  <Shelf 
                    title={shelf.name}
                    key={shelf.id}
                    books={this.state.books.filter((book) => book.shelf===shelf.id)}
                    handleBookMove={this.handleBookMove}
                    backupImage={this.state.backupImage}
                  />
                );
              })}
              <SearchButton 
                linkTarget="/search"
                buttonClass="open-search"
              />
            </div>
          );
        }}>
        </Route>
        <Route path="/search" render={() => {
          return (
            <Search
              handleBookMove={this.handleBookMove}
              books={this.state.books}
              APIsearch={BooksAPI.search}
              backupImage={this.state.backupImage}
              shelves={this.state.shelves}
            >
            </Search>
            );
          }
        }>
        </Route>
      </div>
    );
  }
}

export default App;
