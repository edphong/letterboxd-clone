import React, { useState } from 'react';
import "../styles/NavBar.css";

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
            <div className="navbar-logo" onClick={handleLogoClick}>
                myBacklog
            </div>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <i className="fas fa-search search-icon"></i> {/* Magnifying glass icon */}
            </div>
        </nav>
    );
};

export default NavBar;
