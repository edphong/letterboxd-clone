import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Details from '../components/Details'; // Import Details component
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

    return (
        <div>
            {/* Backdrop container is separate */}
            <div
                className="alternate-container"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    height: '60vh', // Adjust the height as needed
                }}
            ></div>

            {/* Details container */}
            <div className="container">
                <div className="details-container">
                    <Details
                        title={tvShow.name}
                        posterPath={tvShow.poster_path}
                        overview={tvShow.overview}
                        genres={tvShow.genres}
                        tagline={tvShow.tagline}
                        additionalInfo={[
                            { label: 'First Air Date', value: tvShow.first_air_date },
                            { label: 'Number of Seasons', value: tvShow.number_of_seasons },
                            { label: 'Number of Episodes', value: tvShow.number_of_episodes },
                        ]}
                        creators={tvShow.created_by}
                        productionCompanies={tvShow.production_companies}
                        spokenLanguages={tvShow.spoken_languages}
                        reviews={reviews}
                    />
                </div>
            </div>
        </div>
    );
};

export default TVShowDetails;