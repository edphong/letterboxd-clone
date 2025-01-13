import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);
    const [onTheAirTVShows, setOnTheAirTVShows] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        const fetchNowShowingMovies = axios.get("http://localhost:8080/api/movies/now-showing");
        const fetchTrendingMovies = axios.get("http://localhost:8080/api/movies/trending");
        const fetchTrendingTVShows = axios.get("http://localhost:8080/api/tv-shows/trending");
        const fetchUpcomingMovies = axios.get("http://localhost:8080/api/movies/upcoming");
        const fetchTopRatedMovies = axios.get("http://localhost:8080/api/movies/top-rated");
        const fetchTopRatedTVShows = axios.get("http://localhost:8080/api/tv-shows/top-rated");
        const fetchOnTheAirTVShows = axios.get("http://localhost:8080/api/tv-shows/on-the-air");
    
        Promise.all([
            fetchTrendingMovies,
            fetchNowShowingMovies,
            fetchTrendingTVShows,
            fetchUpcomingMovies,
            fetchTopRatedMovies,
            fetchTopRatedTVShows,
            fetchOnTheAirTVShows,
        ])
            .then(
                ([
                    trendingMoviesRes,
                    nowShowingMoviesRes,
                    trendingShowsRes,
                    upcomingMoviesRes,
                    topRatedMoviesRes,
                    topRatedTVShowsRes,
                    onTheAirTVShowsRes,
                ]) => {
                    setMovies(trendingMoviesRes.data.slice(0, 10));
                    setNowShowingMovies(nowShowingMoviesRes.data.slice(0, 10));
                    setTrendingTVShows(trendingShowsRes.data.slice(0, 10));
                    setUpcomingMovies(upcomingMoviesRes.data.slice(0, 10));
                    setTopRatedMovies(topRatedMoviesRes.data.slice(0, 10));
                    setTopRatedTVShows(topRatedTVShowsRes.data.slice(0, 10));
                    setOnTheAirTVShows(onTheAirTVShowsRes.data.slice(0, 10));
                    setLoading(false);
                }
            )
            .catch((err) => {
                setError("Error fetching data: " + err.message);
                setLoading(false);
            });
    
    }, []); // Empty dependency array
    
    useEffect(() => {
        if (upcomingMovies.length === 0) return; // Prevent interval if no upcoming movies
    
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % upcomingMovies.length);
        }, 5000);
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [upcomingMovies]); // Ensure this only runs when upcomingMovies is populated

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    if (loading) {
        return (
            <div>
                {/* add future loading symbol */}
            </div>
        );
    }

    return (
        <div>
            {/* Upcoming Movies Carousel */}
            {upcomingMovies.length > 0 && (
                <div className="backdrop-container">
                    <Link to={`/movie/${upcomingMovies[currentIndex].id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${upcomingMovies[currentIndex].backdrop_path}`}
                            alt="Backdrop"
                            className="backdrop-image"
                        />
                    </Link>
                    <div className="hero-content">
                        <h1>{upcomingMovies[currentIndex].title}</h1>
                        <div className="rating-container">
                            <h2>
                                {(upcomingMovies[currentIndex].vote_average).toFixed(2) + " / 10"} 
                                {" | "}
                                {new Date(upcomingMovies[currentIndex].release_date).getFullYear()}
                            </h2>
                        </div>
                        <p>{upcomingMovies[currentIndex].overview || "No tagline available"}</p>
                    </div>
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
                <h2>TRENDING TELEVISION SHOWS</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {trendingTVShows.map((tvShow) => (
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

            {/* Top Rated Movies Section */}
            <div className="dashboard-container">
                <h2>TOP RATED MOVIES</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {topRatedMovies.map((movie) => (
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

            {/* Top Rated TV Shows Section */}
            <div className="dashboard-container">
                <h2>TOP RATED TELEVISION SHOWS</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {topRatedTVShows.map((tvShow) => (
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

            {/* On The Air TV Shows Section */}
            <div className="dashboard-container">
                <h2>CURRENTLY AIRING TELEVISION SHOWS</h2>
                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <div className="poster-grid">
                        {onTheAirTVShows.map((tvShow) => (
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
