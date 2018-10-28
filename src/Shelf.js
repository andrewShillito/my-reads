import React from "react";
import Book from "./Book"

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
                        />
                    )
                })}
            </div>
        );
    }
}
export default Shelf;