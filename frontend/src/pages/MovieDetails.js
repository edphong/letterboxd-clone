import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MovieDetails.css";
import "../styles/Dashboard.css";

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [movieError, setMovieError] = useState("");
    const [reviewsError, setReviewsError] = useState("");
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/movies/details/${movieId}`)
            .then((response) => setMovie(response.data))
            .catch((err) =>
                setMovieError("Error fetching movie details: " + err.message)
            );

        axios
            .get(`http://localhost:8080/api/movies/reviews/${movieId}`)
            .then((response) => {
                setReviews(response.data);
                setLoadingReviews(false);
            })
            .catch((err) => {
                setReviewsError("Error fetching reviews: " + err.message);
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
        return <p style={{ color: "red" }}>{movieError}</p>;
    }

    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
            />
            <p>{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>

            {/* Display Genre */}
            <p><strong>Genres: </strong>{movie.genres.map(genre => genre.name).join(", ")}</p>

            {/* Display Additional Information */}
            <p><strong>Tagline: </strong>{movie.tagline}</p>
            <p><strong>Runtime: </strong>{movie.runtime} minutes</p>

            {/* Display Collection Information */}
            {movie.belongs_to_collection ? (
                <div>
                    <h3>Related Movies: {movie.belongs_to_collection.name}</h3>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`}
                        alt={`${movie.belongs_to_collection.name} Poster`}
                        className="collection-poster"
                    />
                </div>
            ) : (
                <p>This movie is not part of any collection.</p>
            )}

            {/* Display Production Companies */}
            <p><strong>Production Companies:</strong></p>
            {movie.production_companies.length > 0 ? (
                <ul>
                    {movie.production_companies.map((company) => (
                        <li key={company.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                alt={company.name}
                                className="company-logo"
                            /> {company.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No production companies available.</p>
            )}

            {/* Display Production Countries */}
            <p><strong>Production Countries:</strong></p>
            {movie.production_countries.length > 0 ? (
                <ul>
                    {movie.production_countries.map((country) => (
                        <li key={country.iso_3166_1}>{country.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No production countries available.</p>
            )}

            {/* Display Spoken Languages */}
            <p><strong>Spoken Languages: </strong></p>
            {movie.spoken_languages.length > 0 ? (
                <ul>
                    {movie.spoken_languages.map((language) => (
                        <li key={language.iso_639_1}>{language.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No spoken languages available.</p>
            )}

            <h3>Reviews</h3>
            {loadingReviews ? (
                <p>Loading reviews...</p>
            ) : reviewsError ? (
                <p style={{ color: "red" }}>{reviewsError}</p>
            ) : reviews.length > 0 ? (
                <div className="review-list">
                    {reviews.map((review) => (
                        <div key={review.id}>
                            <p><strong>{review.author}</strong> - Rating: {review.rating} / 10</p>
                            <p>{review.content}</p>
                            <p><small>Reviewed on: {new Date(review.created_at).toLocaleDateString()}</small></p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available for this movie.</p>
            )}
        </div>
    );
};

export default MovieDetails;
