import React from "react";
import Book from "./Book";

class Shelf extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.props.books.map((book) => {
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
        );
    }
}
export default Shelf;