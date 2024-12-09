import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TrendingPage.css"; // Import the CSS

const TrendingPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Loading state for movies

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/movies/trending")
            .then((response) => {
                setMovies(response.data);
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((err) => {
                setError("Error fetching movies: " + err.message);
                setLoading(false); // Stop loading on error
            });
    }, []);
    
    return (
        <div className="movie-container">
            <h1> myBacklog </h1>
            {loading ? null : <h2>Top 20 Trending Today</h2>} {/* Conditionally render heading based on loading state */}
            {loading ? (
                <p className="loading-text">Loading...</p> // Display loading text
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="movie-item"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingPage;