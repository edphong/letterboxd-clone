// BelongsTo.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BelongsTo.css';

const BelongsTo = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/collections/${collectionId}`)
            .then(response => setCollection(response.data))
            .catch(err => setError('Error fetching collection: ' + err.message));
    }, [collectionId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!collection) {
        return <div> </div>;
    }

    return (
        <div className="collection-container">
            <h1>{collection.name}</h1>
            {/* Overview section with unique styling */}
            <p className="collection-overview">{collection.overview}</p>
            <hr className="belongs-to-divider" />
        

            <div className="collection-movies">
                {/* Check if parts exist and is an array */}
                {collection.parts && collection.parts.length > 0 ? (
                    collection.parts.map(movie => (
                        <div key={movie.id} className="collection-movie-card-container">
                            <div className="collection-movie-card">
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        className="collection-movie-poster"
                                    />
                                    <p className="collection-movie-title"> </p>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No movies found in this collection.</p>
                )}
            </div>
        </div>
    );
};

export default BelongsTo;
