import { Link } from 'react-router-dom';
import React from 'react';
import "../styles/Dashboard.css";

const MovieRow = ({ title, movies, pathPrefix, error }) => {
    return (
        <div className="dashboard-container">
            <h2>{title}</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div className="poster-grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <Link to={`/${pathPrefix}/${movie.id}`}>
                                <div className="poster-container">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className="poster"
                                    />
                                    {/* <div className="movie-details">
                                        <h3>{movie.title || movie.name}</h3>
                                        <p>{movie.release_date}</p>
                                        <p>{movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}</p>
                                    </div> */}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieRow;
