import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Details from '../components/Details'; // Import the Details component
import '../styles/Details.css';

const TVShowDetails = () => {
    const { tvShowId } = useParams();
    const [tvShow, setTvShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch TV show details
        axios
            .get(`http://localhost:8080/api/tv-shows/details/${tvShowId}`)
            .then(response => {
                setTvShow(response.data);
                setLoading(false);
            })
            .catch(err => console.error('Error fetching TV show details:', err));

        // Fetch reviews for the TV show
        axios
            .get(`http://localhost:8080/api/tv-shows/reviews/${tvShowId}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(err => console.error('Error fetching reviews:', err));
    }, [tvShowId]);

    if (loading || !tvShow) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    const backdropUrl = `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`;

    // Extract the year from the first air date
    const firstAirYear = new Date(tvShow.first_air_date).getFullYear();

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

            {/* Movie/TV Show details container */}
            <div className="details-movie-container">
                <div className="details-poster-container">
                    <img
                        src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                        alt={`${tvShow.name} Poster`}
                        className="details-movie-poster"
                    />
                </div>
                <div className="details-info-container">
                <Details
                    title={`${tvShow.name} (${firstAirYear})`} // Display title with year
                    tagline={tvShow.tagline}
                    overview={tvShow.overview}
                    genres={tvShow.genres}
                    additionalInfo={[
                        { label: 'Number of Seasons', value: tvShow.number_of_seasons },
                        { label: 'Number of Episodes', value: tvShow.number_of_episodes },
                        { label: 'First Air Date', value: tvShow.first_air_date }
                    ]}
                    creators={tvShow.created_by}
                    spokenLanguages={tvShow.spoken_languages}
                    reviews={reviews}
                    isMovie={false} // TV Show
                />
                </div>
            </div>
        </div>
    );
};

export default TVShowDetails;
