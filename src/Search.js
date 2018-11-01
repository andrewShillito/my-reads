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
                
                this.fixBookData(data);
                
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
    fixBookData = (foundBooks) => { //TODO:Finish this
        for (let i = 0; i<foundBooks.length; i++) {
            for (let j = 0; j<this.props.shelves.length; j++) {
                for (let x = 0; x<this.props.shelves[j].books.length; x++) {
                    if (this.props.shelves[j].books[x].id === foundBooks[i].id) {
                        foundBooks[i].shelf = this.props.shelves[j].id;
                    }
                }
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
                                    onBookMove={this.props.handleBookMove}
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