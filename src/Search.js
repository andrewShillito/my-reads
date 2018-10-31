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
        console.log("value:", value);
        
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
                <div className="shelf">
                    { this.state.booksFound 
                        ? this.state.books.map((book) => {
                            console.log("Found Book:", book);
                            return (
                                <Book 
                                    img={ "imageLinks" in book ? book.imageLinks.thumbnail : "https://books.google.com/books/content?id=McM8AAAAIAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70w5XYIIoMcVBBRBnKsf_t9knPKbQKU5tvLQRDnkzMGqyicVlSJyHP6BY9na2pR_7ya4sj9h935cfTNKfp5YXDImefP9iWDkiZ00dNkj-yoyW-E9EQ"}
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
                <Link to="/">Home</Link>
            </div>
        );    
    }
}

export default Search