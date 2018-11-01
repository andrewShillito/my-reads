import React from "react";
import Book from "./Book";
import SearchButton from "./SearchButton"

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
                
                // const fixedData=(this.fixBookData(data)); //TODO: finish this
                
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
    // fixBookData = (bookArr) => { //TODO:Finish this
    //     for (let i = 0; i<bookArr.length; i++) {
    //         for (let j = 0; j<this.props.currentlyReading.length; j++) {
    //             // if ()
    //         }
    //     }
    // }
    // iterateBookData = (bookArr, shelfBooks) => { //TODO: Finish this
        
    // }
    render() {

        return (
            <div className="search-component-container">
                <div className="search-bar">
                    <SearchButton 
                        linkTarget="/"
                        buttonClass="close-search"
                    />
                    <div className="search-bar-input-container">
                        <input 
                            placeholder="Search..."
                            value={this.inputValue}
                            className="search-bar-input"
                            onChange={(event) => this.handleInputUpdate(event.target.value)}
                        />
                    </div>
                </div>
                
                <div className="shelf-content">
                    { this.state.booksFound 
                        ? this.state.books.map((book) => {
                            console.log("book:", book)

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