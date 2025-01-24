import React from 'react';
import "../styles/SearchBar.css";
import searchIcon from '../assets/search.webp'; // Import the image

const SearchBar = ({ searchQuery, handleSearchChange }) => { // immutable (searchQuery) and mutable (handleSearchChange) components of the search query 
    return (
        <div className="navbar-search">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
                style={{ backgroundImage: `url(${searchIcon})` }} // Set the search icon as background image
            />
        </div>
    );
};

export default SearchBar;
