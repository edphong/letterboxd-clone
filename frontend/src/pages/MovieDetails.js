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
        axios
        .get(`http://localhost:8080/api/movies/details/${movieId}`)
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

    if (loadingReviews || !movie) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (movieError) {
        return <p style={{ color: 'red' }}>{movieError}</p>;
    }

    if (reviewsError) { 
        return <p style={{ color: 'red'}}>{reviewsError}</p>;
    }

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    // Determine if it's a movie or TV show based on the presence of the 'first_air_date' field
    const isMovie = movie.release_date !== undefined;
    
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
                        additionalInfo={[
                            { label: 'Release Date', value: movie.release_date },
                            { label: 'Runtime', value: `${movie.runtime} minutes` }
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
