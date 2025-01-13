import React from 'react';
import '../styles/MovieCard.css'; // Import the CSS file for the hover effect

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img 
                className="poster" 
                src={movie.poster_path} 
                alt={movie.title} 
            />
            <div className="movie-details">
                <h3>{movie.title}</h3>
                <p className="vote-average">
                    {movie.vote_average.toFixed(2)} / 10
                </p>
                <p className="overview">
                    {movie.overview.length > 150 
                        ? movie.overview.substring(0, 150) + "..." 
                        : movie.overview}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
