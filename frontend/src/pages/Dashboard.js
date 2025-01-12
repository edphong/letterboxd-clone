import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowShowingMovies = axios.get("http://localhost:8080/api/movies/now-showing");
        const fetchTrendingMovies = axios.get("http://localhost:8080/api/movies/trending");
        const fetchTrendingTVShows = axios.get("http://localhost:8080/api/tv/trending");
        const fetchUpcomingMovies = axios.get("http://localhost:8080/api/movies/upcoming");

        Promise.all([
            fetchTrendingMovies,
            fetchNowShowingMovies,
            fetchTrendingTVShows,
            fetchUpcomingMovies,
        ])
            .then(([trendingMoviesRes, nowShowingMoviesRes, trendingShowsRes, upcomingMoviesRes]) => {
                setMovies(trendingMoviesRes.data.slice(0, 20));
                setNowShowingMovies(nowShowingMoviesRes.data.slice(0, 20));
                setTvShows(trendingShowsRes.data.slice(0, 20));
                setUpcomingMovies(upcomingMoviesRes.data.slice(0, 10)); // Top 10 upcoming movies
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data: " + err.message);
                setLoading(false);
            });
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingMovies.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? upcomingMovies.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Upcoming Movies Carousel */}
            {upcomingMovies.length > 0 && (
                <div className="backdrop-container">
                    {/* Backdrop Image */}
                    <img
                        src={`https://image.tmdb.org/t/p/original${upcomingMovies[currentIndex].backdrop_path}`}
                        alt="Backdrop"
                        className="backdrop-image"
                    />

                    {/* Content overlay */}
                    <div className="hero-content">
                        <h1>{upcomingMovies[currentIndex].title}</h1>
                        <div className="rating-container">
                        <h2>
                            {upcomingMovies[currentIndex].vote_average + " / 10"} 
                            {" | "}
                            {new Date(upcomingMovies[currentIndex].release_date).getFullYear()}
                        </h2>
                        </div>
                        <p>{upcomingMovies[currentIndex].overview || "No tagline available"}</p>
                    </div>

                    {/* Navigation Arrows */}
                    <button className="carousel-arrow left" onClick={handlePrev}>
                        &#8249;
                    </button>
                    <button className="carousel-arrow right" onClick={handleNext}>
                        &#8250;
                    </button>

                    {/* Dots Navigation */}
                    <div className="dots-container">
                        {upcomingMovies.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""}`}
                                onClick={() => handleDotClick(index)}
                            ></span>
                        ))}
                    </div>
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
