import React, { Component } from 'react';
import './App.css';
import Header from "./Header"
import Shelf from "./Shelf"

class App extends Component {
  state = {
    shelves: [
      {name: "Currently Reading"},
      {name: "Want to Read"},
      {name: "Completed"},
      ]
  }
  render() {
    return (
      <div className="App">
        <Header />
        {this.state.shelves.map((shelf) => {
          return (
            <Shelf 
            title={shelf.name}
            key={shelf.name}
          />
          )})}
      </div>
    );
  }
}

export default App;
