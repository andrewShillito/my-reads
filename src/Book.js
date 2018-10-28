import React from "react";

const Book = function(props){
    return (
        <div className="book">
            <img 
                className="book-img"
                src={props.img}
                alt={`${props.title} book cover`}
            />
            <select className="book-select-menu">
                <optgroup label="Move to...">
                    <option>Currently Reading</option>
                    <option>Want to Read</option>
                    <option>Completed</option>
                    <option>None</option>
                </optgroup>
            </select>
            <h4 className="book-title">{props.title}</h4>
            <span className="book-author">{props.author}</span>
        </div>
    )
}

export default Book;