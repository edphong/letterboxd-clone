import React, { useState } from 'react';
import SearchBar from './SearchBar';  // Import SearchBar component
import "../styles/NavBar.css";

// Import the logo image
import logo from '../assets/logo.webp';

const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLogoClick = () => {
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo-container" onClick={handleLogoClick}>
                {/* Text and logo together inside the clickable container */}
                <div className="navbar-logo">
                    myBacklog
                </div>
                <img src={logo} alt="Logo" className="navbar-logo-img" />
            </div>
            <div className="navbar-search-container">
                <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} /> {/* Use the SearchBar component */}
            </div>
        </nav>
    );
};

export default NavBar;
