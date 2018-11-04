import React from "react";
import Book from "./Book";
import SearchButton from "./SearchButton"

class Search extends React.Component { 
    state = {
        inputValue: "",
        books: [],
        booksFound: false,
    }
    handleInputUpdate = (value) => {
        this.setState(prevState => ({
            inputValue: value
        }));

        if (value === "") {
            this.setState(() => ({
                    books: [],
                    booksFound: false,
            }));
        } else {
            this.search(value, 30)
            .then((data) => {
            if (Array.isArray(data)) {
                
                this.fixBookData(data); //this.fixBookData adds a shelf value to books that have been shelved from api call & returns undefined
                
                this.setState(() => ({
                    books: data,
                    booksFound: true,
                }));
            } else {
                this.setState(() => ({
                    books: [],
                    booksFound: false,
                }));
            }
        });
        }
    }
    search = (query) => {
        return this.props.APIsearch(query, 30);
    }
    fixBookData = (foundBooks) => {
        for (let i = 0; i< foundBooks.length; i++) {
            const correctShelf = this.props.shelves.find((shelf, index, arr) => { //for the first shelf that tests true
                const correctBook = shelf.books.find((book, index, arr) => book.id === foundBooks[i].id); //for the first book that has the same id
                return correctBook; //return truth of if shelf had correct book
            });
            if (correctShelf) {
                foundBooks[i].shelf = correctShelf.id; //assign shelf of book from api call to be the correct shelf according to our app data
            }
        }
    }
    render() {
        return (
            <div className="search-component-container">
                <div className="search-bar">
                    <SearchButton 
                        linkTarget="/"
                        buttonClass="close-search"
                    />
                    <div className="search-bar-input-container">
                        <input 
                            placeholder="Search..."
                            value={this.inputValue}
                            className="search-bar-input"
                            onChange={(event) => this.handleInputUpdate(event.target.value)}
                        />
                    </div>
                </div>
                
                <div className="shelf-content">
                    { this.state.booksFound 
                        ? this.state.books.map((book) => {
                            return (
                                <Book 
                                    img={"imageLinks" in book ? book.imageLinks.thumbnail : this.props.backupImage}
                                    title={book.title}
                                    author={book.authors!==undefined ? book.authors[0] : "author unknown"}
                                    key={book.id}
                                    handleBookMove={this.props.handleBookMove}
                                    id={book.id}
                                    shelf={book.shelf}
                                    book={book}
                                />
                            );
                        })
                        : <h2>No Books Found</h2>
                    }
                </div>
            </div>
        );    
    }
}

export default Search