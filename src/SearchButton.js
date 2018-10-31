import React from "react";
import { Link } from "react-router-dom";

function SearchButton(props) {
    return (
        <div className="search-btn-container">
            <Link to={props.linkTarget} className={props.buttonClass} />
        </div>
    )
}

export default SearchButton