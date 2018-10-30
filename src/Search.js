import React from "react";
import { Link } from "react-router-dom";

class Search extends React.Component { 
    state = {
        inputValue: "",
    }
    handleInputUpdate = (value) => {
        this.setState(prevState => ({
            inputValue: value
        }), this.search);
    }
    search = (query) => {
        console.log(this.props.APIsearch(query));
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
                <Link to="/">Home</Link>
            </div>
        );    
    }
}

export default Search