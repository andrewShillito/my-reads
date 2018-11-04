import React from "react";
import Book from "./Book";

class Shelf extends React.Component {
    render() {
        return (
            <div className="shelf">
                <h1 className="shelf-title">{this.props.title}</h1>
                <div className="shelf-content">
                    {this.props.books.map((book) => {
                        return (
                            <Book 
                                img={"imageLinks" in book ? book.imageLinks.thumbnail : this.props.backupImage}
                                title={book.title}
                                author={book.authors[0]}
                                key={book.id}
                                handleBookMove={this.props.handleBookMove}
                                id={book.id}
                                shelf={book.shelf}
                                book={book}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default Shelf;