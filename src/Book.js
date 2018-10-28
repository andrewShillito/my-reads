import React from "react";

class Book extends React.Component {
    render() {
        return (
            <div className="book">
                <img 
                    className="book-img"
                    src="https://unsplash.com/photos/rMYrkFfw36U" //change
                    alt="book cover picture"
                />
                <select className="book-select-menu">
                    <optgroup label="Move to...">
                        <option>Currently Reading</option>
                        <option>Want to Read</option>
                        <option>Completed</option>
                        <option>None</option>
                    </optgroup>
                </select>
                <h4 className="book-title"></h4>
                <span></span>
            </div>
        )
    }
}

export default Book;