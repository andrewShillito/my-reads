import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

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
    render() {
        return (
            <div>
                <div>
                    <input 
                        placeholder="Search..."
                        value={this.inputValue}
                        onChange={(event) => this.handleInputUpdate(event.target.value)}
                    />
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