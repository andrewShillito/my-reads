import React from "react";

function Book(props) {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-img-container" style={{backgroundImage: `url(${props.img})`}}></div>
                <div className="book-shelf-changer">
                    <select className="book-select-menu" defaultValue={props.shelf || "none"} onChange={(event) => props.handleBookMove(props.book, event.target.value)}>
                        <optgroup label="Move to...">
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option> 
                        </optgroup>
                    </select>
                </div>
            </div>
            <div className="book-text">
                <h4 className="book-title">{props.title}</h4>
                <span className="book-author">{props.author}</span>
            </div>
        </div>
    );    
}

export default Book;