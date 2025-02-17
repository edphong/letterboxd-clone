import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "../styles/SearchBar.css";
import searchIcon from '../assets/search.webp';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state for search
    const searchBarRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigation

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSearchChange = async (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length > 1) {
            setIsLoading(true); // Start loading
            try {
                const response = await axios.get(`http://localhost:8080/api/search?query=${newQuery}`);
                setSuggestions(response.data); // Now response contains both title, id, and mediaType
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsLoading(false); // Stop loading after the request completes
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (id, mediaType) => {
        setQuery(""); // Clear search input
        setSuggestions([]); // Hide suggestions
        
        if (mediaType === "movie") {
            navigate(`/movie/${id}`); // Navigate to MovieDetails page using TMDb ID
        } else if (mediaType === "tv") {
            navigate(`/tv-show/${id}`); // Navigate to TV Show details page using TMDb ID
        }
    };

    return (
        <div className="navbar-search" ref={searchBarRef}>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                className="search-input"
                style={{ backgroundImage: `url(${searchIcon})` }}
            />
            {isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : suggestions.length > 0 ? (
                <ul className="search-dropdown">
                    {suggestions.map((item) => (
                        <li key={item.id} onClick={() => handleSuggestionClick(item.id, item.mediaType)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            ) : (
                query.length > 1 && <div className="no-results"> </div>
            )}
        </div>
    );
};

export default SearchBar;
