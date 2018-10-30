import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book"

class Search extends React.Component { 
    state = {
        inputValue: "",
        books: [],
    }
    handleInputUpdate = (value) => {
        this.setState(prevState => ({
            inputValue: value
        }));
        console.log("value:", value);
        this.search(value, 30)
        .then((data) => {
            if (Array.isArray(data)) {
                this.setState(() => ({
                    books: data,
                }));
            } else {
                this.setState(() => ({
                    books: [],
                }));
            }
        });
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
                    {this.state.books.map((book) => {
                        return (
                            <Book 
                                img={book.imageLinks.thumbnail}
                                title={book.title}
                                author={book.authors[0]}
                                key={book.id}
                                onBookMove={this.props.handleBookMove}
                                id={book.id}
                                shelf={book.shelf}
                                book={book}
                            />
                        )
                    })}
                </div>
                <Link to="/">Home</Link>
            </div>
        );    
    }
}

export default Search