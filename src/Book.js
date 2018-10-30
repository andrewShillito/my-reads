import React from "react";

class Book extends React.Component {
    state = {
        shelf: this.props.shelf,
    }
    render() {
        return (
            <div className="book">
                <div className="book-img-container">
                    <img 
                        className="book-img"
                        src={this.props.img}
                        alt={`${this.props.title} book cover`}
                    />
                    <select className="book-select-menu" onChange={(event) => this.props.onBookMove(this.props.book, event.target.value)}>
                        <optgroup label="Move to...">
                            <option value="" selected disabled hidden></option>
                            <option value="currentlyReading" disabled={this.props.shelf==="currentlyReading"}>Currently Reading</option>
                            <option value="wantToRead" disabled={this.props.shelf==="wantToRead"}>Want to Read</option>
                            <option value="read" disabled={this.props.shelf==="read"}>Read</option>
                            <option value="none" disabled={this.props.shelf==="none"}>None</option> 
                        </optgroup>
                    </select>
                </div>
                <h4 className="book-title">{this.props.title}</h4>
                <span className="book-author">{this.props.author}</span>
            </div>
        )
    }
}

export default Book;