import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Details from '../components/Details'; // Import the Details component
import '../styles/Details.css';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [movieError, setMovieError] = useState('');
    const [reviewsError, setReviewsError] = useState('');
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        axios // HTTP requests, to fetch APIs 
        .get(`http://localhost:8080/api/movies/details/${movieId}`) // on click from dashboard, get movie ID
        .then(response => setMovie(response.data))
        .catch(err =>
            setMovieError('Error fetching movie details: ' + err.message)
        );

        axios
        .get(`http://localhost:8080/api/movies/reviews/${movieId}`)
        .then(response => {
            setReviews(response.data);
            setLoadingReviews(false);
        })
        .catch(err => {
            setReviewsError('Error fetching reviews: ' + err.message);
            setLoadingReviews(false);
        });
    }, [movieId]);

    if (loadingReviews || !movie) { // loading
        return (
            <div>
            </div>
        );
    }

    if (movieError) { // error handling
        return <p style={{ color: 'red' }}>{movieError}</p>;
    }

    if (reviewsError) { // error handling
        return <p style={{ color: 'red'}}>{reviewsError}</p>;
    }

    // Format the runtime into hours and minutes
    const runtimeInMinutes = movie.runtime;
    const hours = Math.floor(runtimeInMinutes / 60); // Get the full hours
    const minutes = runtimeInMinutes % 60; // Get the remaining minutes
    const formattedRuntime = `${hours}h ${minutes}m`;

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    return (
        <div>
            {/* Backdrop container */}
            <div
                className="details-header-container"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    height: '40vh', // Adjust the height as needed
                }}
            ></div>

            <div className="details-movie-container">
                <div className="details-poster-container">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={`${movie.title} Poster`}
                        className="details-movie-poster"
                    />
                </div>
                <div className="details-info-container">
                    <Details
                        title={movie.title}
                        tagline={movie.tagline}
                        overview={movie.overview}
                        genres={movie.genres}
                        belongsToCollection={movie.belongs_to_collection}
                        additionalInfo={[
                            { label: 'Release Date', value: movie.release_date },
                            { label: 'RUNTIME', value: formattedRuntime }
                        ]}
                        creators={movie.production_companies}
                        spokenLanguages={movie.spoken_languages}
                        reviews={reviews}
                        isMovie={true} // Movie
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
