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
    isMovie // New prop to distinguish between movie and TV show
}) => {
    // Extract Release Date or First Air Date depending on the content type (movie or TV show)
    const releaseDateLabel = isMovie ? 'Release Date' : 'First Air Date';
    const releaseDateInfo = additionalInfo.find(info => info.label === releaseDateLabel);
    const releaseDateValue = releaseDateInfo ? new Date(releaseDateInfo.value) : null;
    const releaseYear = releaseDateValue ? releaseDateValue.getFullYear() : null;

    return (
        <div className="details-content">
            <h2 className="details-title">
                {title} 
                {releaseYear && <span className="details-year">{releaseYear}</span>}
            </h2>
            <hr className="divider" />
            <p className="details-tagline">{tagline}</p>
            <p className="details-overview">{overview}</p>

            {/* Display Genres */}
            <p className="details-genres"><strong>Genres: </strong>{genres.map(genre => genre.name).join(", ")}</p>

            {/* Display Additional Info excluding date info */}
            {additionalInfo.filter(info => info.label !== releaseDateLabel).map((info, index) => (
                <p key={index} className="details-additional-info">
                    <strong>{info.label}:</strong> {info.value}
                </p>
            ))}

            {/* Display Created By */}
            {creators && creators.length > 0 && (
                <p className="details-created-by">
                    <strong>Created By: </strong>
                    {creators.map((creator, index) => (
                        <span key={creator.id}>
                            {creator.name}{index < creators.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            )}

            {/* Display Languages */}
            <div className="details-languages">
                <strong>Languages: </strong>
                {spokenLanguages.length > 0 ? (
                    <span className="languages-list">
                        {spokenLanguages.map((language, index) => (
                            <span key={language.iso_639_1}>
                                {language.name}{index < spokenLanguages.length - 1 && ', '}
                            </span>
                        ))}
                    </span>
                ) : (
                    <span className="no-languages">No spoken languages available.</span>
                )}
            </div>
            
            {/* Display Reviews */}
            {reviews && reviews.length > 0 && (
                <div className="details-reviews-list">
                    <p className="details-reviews-title">Recent Reviews</p>
                    <hr className="divider" />
                    {reviews.map((review, index) => (
                        <div key={review.id} className="review-item">
                            <p> Review by <strong>{review.author}</strong> - Rating: {review.author_details?.rating ? review.author_details.rating : '-'} / 10</p>
                            <p>{review.content}</p>
                            <p><small>{new Date(review.created_at).toLocaleDateString()}</small></p>

                            {/* Divider after each review except the last one */}
                            {index < reviews.length - 1 && <hr className="comment-divider" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Details;
