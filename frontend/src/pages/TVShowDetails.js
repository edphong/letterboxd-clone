import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TVShowDetails.css"; // Import the CSS
import "../styles/Dashboard.css";

const TVShowDetails = () => {
    const { tvShowId } = useParams(); // Get the TV show ID from the URL
    const [tvShow, setTvShow] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Loading state for TV show details

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/tv/details/${tvShowId}`)
            .then((response) => {
                setTvShow(response.data);
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((err) => {
                setError("Error fetching TV show details: " + err.message);
                setLoading(false); // Stop loading on error
            });
    }, [tvShowId]);

    if (loading || !tvShow) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="tv-show-details">
            <h2>{tvShow.name}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="tv-show-poster"
            />
            <p>{tvShow.overview}</p>
            <p><strong>First Air Date:</strong> {tvShow.first_air_date}</p>
            <p><strong>Rating:</strong> {tvShow.vote_average} / 10</p>

            {/* Display Genre */}
            <p><strong>Genres: </strong>{tvShow.genres.map(genre => genre.name).join(", ")}</p>

            {/* created by */}
            <p><strong>Created By:</strong></p>
            {tvShow.created_by.length > 0 ? (
                <ul>
                    {tvShow.created_by.map((creator) => (
                        <li key={creator.id}>
                            {creator.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${creator.profile_path}`}
                                    alt={creator.name}
                                    className="creator-profile"
                                />
                            ) : (
                                <div className="creator-profile-placeholder"></div>
                            )}
                            {creator.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No creators available.</p>
            )}

            {/* Display Additional Information */}
            <p><strong>Tagline: </strong>{tvShow.tagline}</p>
            <p><strong>Number of Seasons:</strong> {tvShow.number_of_seasons}</p>
            <p><strong>Number of Episodes:</strong> {tvShow.number_of_episodes}</p>

            {/* Last Episode */}
            <p><strong>Last Episode Aired:</strong> {tvShow.last_episode_to_air ? `${tvShow.last_episode_to_air.name} (${tvShow.last_episode_to_air.air_date})` : "N/A"}</p>

            {/* Next Episode to Air */}
            <p><strong>Next Episode to Air:</strong> {tvShow.next_episode_to_air ? `${tvShow.next_episode_to_air.name} (${tvShow.next_episode_to_air.air_date})` : "N/A"}</p>

            {/* Networks */}
            <p><strong>Networks:</strong></p>
            {tvShow.networks.length > 0 ? (
                <ul>
                    {tvShow.networks.map((network) => (
                        <li key={network.id}>
                            {network.logo_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                                    alt={network.name}
                                    className="network-logo"
                                />
                            ) : (
                                <div className="network-logo-placeholder"></div>
                            )}
                            {network.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No networks available.</p>
            )}

            {/* Display Production Companies */}
            <p><strong>Production Companies:</strong></p>
            {tvShow.production_companies.length > 0 ? (
                <ul>
                    {tvShow.production_companies.map((company) => (
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

            {/* Display Spoken Languages */}
            <p><strong>Spoken Languages: </strong></p>
            {tvShow.spoken_languages.length > 0 ? (
                <ul>
                    {tvShow.spoken_languages.map((language) => (
                        <li key={language.iso_639_1}>{language.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No spoken languages available.</p>
            )}
        </div>
    );
};

export default TVShowDetails;
