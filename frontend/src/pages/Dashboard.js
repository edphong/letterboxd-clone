import React, { useState, useEffect } from "react"; // state [immutable value, mutable value to be updated], effect []
import { Link } from "react-router-dom"; // library imported for handling page navigation
import axios from "axios"; // handles HTTP requests (GET, POST, PUT, DELETE)
import Carousel from "../components/Carousel";
import "../styles/Dashboard.css";
import "../styles/Carousel.css";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [nowShowingMovies, setNowShowingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);
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

        Promise.all([ // waits for all Promises to resolve before continuing
            fetchTrendingMovies,
            fetchNowShowingMovies,
            fetchTrendingTVShows,
            fetchUpcomingMovies,
            fetchTopRatedMovies,
            fetchTopRatedTVShows,
        ])
            .then(
                ([
                    trendingMoviesRes,
                    nowShowingMoviesRes,
                    trendingShowsRes,
                    upcomingMoviesRes,
                    topRatedMoviesRes,
                    topRatedTVShowsRes,
                ]) => {
                    setMovies(trendingMoviesRes.data.slice(0, 18)); // slices data into indexes of 18 
                    setNowShowingMovies(nowShowingMoviesRes.data.slice(0, 18));
                    setTrendingTVShows(trendingShowsRes.data.slice(0, 18));
                    setUpcomingMovies(upcomingMoviesRes.data.slice(0, 18));
                    setTopRatedMovies(topRatedMoviesRes.data.slice(0, 18));
                    setTopRatedTVShows(topRatedTVShowsRes.data.slice(0, 18));
                    setLoading(false); // Data is loaded
                }
            )
            .catch((err) => {
                setError("Error fetching data: " + err.message);
                setLoading(false); // Even if error occurs, stop loading state
            });
    }, []); // Empty dependency array ensures this only runs once 

    if (loading) { // when page is loading 
        return (
            <div>
                <nav>
                </nav>
                <div className="loading-state">
                </div>
            </div>
        );
    }

    const renderMediaRow = (title, mediaItems, pathPrefix) => ( // poster rows 
        <div className="dashboard-container">
            <h2>{title}</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div className="dashboard-poster-grid">
                    {mediaItems.map((item) => (
                        <div key={item.id} className="media-item">
                            <Link to={`/${pathPrefix}/${item.id}`}>
                                <div className="dashboard-poster-container">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt={item.title || item.name} // More clear with 'title' for movies and 'name' for TV shows
                                        className="dashboard-poster"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <nav>
            </nav>
            {/* Upcoming Movies Carousel */}
            <Carousel movies={upcomingMovies} />
            {/* Other Sections */}
            {renderMediaRow("NOW SHOWING MOVIES", nowShowingMovies, "movie")}
            {renderMediaRow("TRENDING MOVIES", movies, "movie")}
            {renderMediaRow("TRENDING TELEVISION SHOWS", trendingTVShows, "tv-show")}
            {renderMediaRow("UPCOMING MOVIES", upcomingMovies, "movie")}
            {renderMediaRow("TOP RATED MOVIES", topRatedMovies, "movie")}
            {renderMediaRow("TOP RATED TELEVISION SHOWS", topRatedTVShows, "tv-show")}
        </div>
    );
};

export default Dashboard;
