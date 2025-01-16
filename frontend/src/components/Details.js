// src/components/Details.js
import React from 'react';
import "../styles/Details.css";

const Details = ({ 
    title,
    tagline,
    overview,
    genres,
    additionalInfo,
    creators,
    spokenLanguages,
    reviews,
}) => {
    const releaseDate = additionalInfo.find(info => info.label === 'Release Date');
    const year = releaseDate ? new Date(releaseDate.value).getFullYear() : null;

    return (
        <div className="details-content">
            <h2 className="details-title">
                {title} 
                {year && <span className="details-year">{year}</span>}
                <hr className="divider" />
            </h2>
            <p className="details-tagline"><strong> </strong>{tagline}</p>
            <p className="details-overview">{overview}</p>

            {/* Display Genres */}
            <p className="details-genres"><strong>Genres: </strong>{genres.map(genre => genre.name).join(", ")}</p>

            {/* Display Additional Info excluding release date */}
            {additionalInfo.filter(info => info.label !== 'Release Date').map((info, index) => (
                <p key={index} className="details-additional-info">
                    <strong>{info.label}:</strong> {info.value}
                </p>
            ))}

            {/* Display Created By */}
            {creators && creators.length > 0 && (
                <>
                    <p className="details-created-by"><strong>Created By:</strong></p>
                    <ul className="details-creators-list">
                        {creators.map(creator => (
                            <li key={creator.id} className="creator-item">
                                {creator.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Display Languages */}
            <p className="details-languages"><strong>Languages: </strong></p>
            {spokenLanguages.length > 0 ? (
                <ul className="languages-list">
                    {spokenLanguages.map(language => (
                        <li key={language.iso_639_1} className="language-item">{language.name}</li>
                    ))}
                </ul>
            ) : (
                <p className="no-languages">No spoken languages available.</p>
            )}

            {/* Display Reviews */}
            {reviews && reviews.length > 0 && (
                <div className="details-review-list">
                    <h3 className="details-reviews-title">Recent Reviews</h3>
                    {reviews.map(review => (
                        <div key={review.id} className="review-item">
                            <p><strong>{review.author}</strong> - Rating: {review.rating} / 10</p>
                            <p>{review.content}</p>
                            <p><small>Reviewed on: {new Date(review.created_at).toLocaleDateString()}</small></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Details;
