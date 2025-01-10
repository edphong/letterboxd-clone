import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]); // State for upcoming movies
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowShowingMovies = axios.get("http://localhost:8080/api/movies/now-showing");
        const fetchTrendingMovies = axios.get("http://localhost:8080/api/movies/trending");
        const fetchUpcomingMovies = axios.get("http://localhost:8080/api/movies/upcoming"); // Corrected URL
        const fetchTrendingTVShows = axios.get("http://localhost:8080/api/tv/trending");

        Promise.all([
            fetchTrendingMovies,
            fetchNowShowingMovies,
            fetchUpcomingMovies,
            fetchTrendingTVShows,
        ])
            .then(([trendingMoviesRes, nowShowingMoviesRes, upcomingMoviesRes, trendingShowsRes]) => {
                setMovies(trendingMoviesRes.data.slice(0, 10));
                setNowShowingMovies(nowShowingMoviesRes.data.slice(0, 10));
                setUpcomingMovies(upcomingMoviesRes.data.slice(0, 10)); // Set state for upcoming movies
                setTvShows(trendingShowsRes.data.slice(0, 10));
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data: " + err.message);
                setLoading(false);
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
                            <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item">
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
                            <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item">
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

            {/* Upcoming Movies Section */}
            <div className="dashboard-container">
                <h2>Upcoming Movies</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {upcomingMovies.map((movie) => (
                            <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item">
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
                            <Link key={tvShow.id} to={`/tv-show/${tvShow.id}`} className="tv-show-item">
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
