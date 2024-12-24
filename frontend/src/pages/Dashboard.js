import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css"; // Import the CSS

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [nowShowingMovies, setNowShowingMovies] = useState([]); // New state for Now Showing movies
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Loading state for both movies and TV shows]
    
    const [airingToday, setAiringToday] = useState ([]);

    useEffect(() => {
        // Fetch movies, TV shows, and now showing concurrently
        const fetchNowShowing = axios.get("http://localhost:8080/api/movies/now-showing");
        const fetchMovies = axios.get("http://localhost:8080/api/movies/trending");
        const fetchTvShows = axios.get("http://localhost:8080/api/tv/trending");
        const fetchAiringToday = axios.get("http://localhost:8080/api/tv/airing-today");

        Promise.all([fetchMovies, fetchTvShows, fetchNowShowing, fetchAiringToday])
            .then(([moviesResponse, tvShowsResponse, nowShowingResponse, airingTodayResponse]) => {
                setMovies(moviesResponse.data.slice(0, 10)); // Limit to top 10 movies
                setTvShows(tvShowsResponse.data.slice(0, 10)); // Limit to top 10 TV shows
                setNowShowingMovies(nowShowingResponse.data.slice(0, 10)); // Limit to top 10 now showing movies
                setAiringToday(airingTodayResponse.data.slice(0,10));
                setLoading(false); // Stop loading when all fetches complete
            })
            .catch((err) => {
                setError("Error fetching data: " + err.message);
                setLoading(false); // Stop loading on error
            });
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (        
        <div>
            {/* Now Showing Section */}
            <div className="dashboard-container">
                <h2>Now Showing</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {nowShowingMovies.map((movie) => (
                            <Link
                                key={movie.id}
                                to={`/movie/${movie.id}`}
                                className="movie-item"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="poster"
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Trending Movies Section */}
            <div className="dashboard-container">
                <h2>Trending Movies Today</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {movies.map((movie) => (
                            <Link
                                key={movie.id}
                                to={`/movie/${movie.id}`}
                                className="movie-item"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="poster"
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Trending TV Shows Section */}
            <div className="dashboard-container">
                <h2>Trending TV Shows Today</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {tvShows.map((tvShow) => (
                            <Link
                                key={tvShow.id}
                                to={`/tv-show/${tvShow.id}`}
                                className="tv-show-item"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`}
                                    alt={tvShow.name}
                                    className="poster"
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
