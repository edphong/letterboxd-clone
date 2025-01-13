import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieRow from "../components/MovieRow";
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
    const [onTheAirTVShows, setOnTheAirTVShows] = useState([]);
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

    if (loading) {
        return <div></div>;
    }

    return (
        <div>
            <Carousel movies={upcomingMovies} />

            <MovieRow title="NOW SHOWING" movies={nowShowingMovies} pathPrefix="movie" error={error} />
            <MovieRow title="TRENDING MOVIES" movies={movies} pathPrefix="movie" error={error} />
            <MovieRow title="TRENDING TELEVISION SHOWS" movies={trendingTVShows} pathPrefix="tv-show" error={error} />
            <MovieRow title="UPCOMING MOVIES" movies={upcomingMovies} pathPrefix="movie" error={error} />
            <MovieRow title="TOP RATED MOVIES" movies={topRatedMovies} pathPrefix="movie" error={error} />
            <MovieRow title="TOP RATED TELEVISION SHOWS" movies={topRatedTVShows} pathPrefix="tv-show" error={error} />
            <MovieRow title="NOW AIRING TELEVISION SHOWS" movies={onTheAirTVShows} pathPrefix="tv-show" error={error} />
        </div>
    );
};

export default Dashboard;
