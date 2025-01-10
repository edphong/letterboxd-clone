import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [backdropImage, setBackdropImage] = useState(""); // State for the backdrop image
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowShowingMovies = axios.get("http://localhost:8080/api/movies/now-showing");
        const fetchTrendingMovies = axios.get("http://localhost:8080/api/movies/trending");
        const fetchTrendingTVShows = axios.get("http://localhost:8080/api/tv/trending");

        Promise.all([
            fetchTrendingMovies,
            fetchNowShowingMovies,
            fetchTrendingTVShows,
        ])
            .then(([trendingMoviesRes, nowShowingMoviesRes, trendingShowsRes]) => {
                setMovies(trendingMoviesRes.data.slice(0, 20));
                setNowShowingMovies(nowShowingMoviesRes.data.slice(0, 20));
                setTvShows(trendingShowsRes.data.slice(0, 20));

                // Set the backdrop image from the first movie (or choose another)
                if (trendingMoviesRes.data.length > 0) {
                    const backdrop = trendingMoviesRes.data[0].backdrop_path;
                    setBackdropImage(backdrop);
                }

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
            {/* Backdrop Image Section */}
            {backdropImage && (
                <div className="backdrop-container">
                    <img
                        src={`https://image.tmdb.org/t/p/original${backdropImage}`}
                        alt="Backdrop"
                        className="backdrop-image"
                    />
                </div>
            )}

            {/* Now Showing Section */}
            <div className="dashboard-container">
                <h2>NOW SHOWING</h2>
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
                <h2>TRENDING MOVIES</h2>
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

            {/* Trending TV Shows Section */}
            <div className="dashboard-container">
                <h2>TRENDING TV SHOWS</h2>
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
