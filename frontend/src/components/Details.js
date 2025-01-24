import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
    belongsToCollection,
    isMovie 
}) => {
    const navigate = useNavigate(); // Initialize the navigate hook

    // Extract Release Date or First Air Date depending on the content type
    const releaseDateLabel = isMovie ? 'Release Date' : 'First Air Date';
    const releaseDateInfo = additionalInfo.find(info => info.label === releaseDateLabel);
    const releaseDateValue = releaseDateInfo ? new Date(releaseDateInfo.value) : null;
    const releaseYear = releaseDateValue ? releaseDateValue.getFullYear() : null; 

    // Redirect to collection page
    const handlePosterClick = () => {
        if (belongsToCollection?.id) {
            navigate(`/movie/collection/${belongsToCollection.id}`);
        }
    };

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
            <p className="details-genres"><strong>GENRES: </strong>{genres.map(genre => genre.name).join(", ")}</p>

            {/* Display Additional Info excluding date info */}
            {additionalInfo.filter(info => info.label !== releaseDateLabel).map((info, index) => (
                <p key={index} className="details-additional-info">
                    <strong>{info.label}:</strong> {info.value}
                </p>
            ))}

            {/* Display Created By */}
            {creators && creators.length > 0 && (
                <p className="details-created-by">
                    <strong>CREATED BY: </strong>
                    {creators.map((creator, index) => (
                        <span key={creator.id}>
                            {creator.name}{index < creators.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            )}

            {/* Display Languages */}
            <div className="details-languages">
                <strong>LANGUAGES: </strong>
                {spokenLanguages.length > 0 ? (
                    <span className="languages-list">
                        {spokenLanguages.map((language, index) => (
                            <span key={language.iso_639_1}>
                                {index > 0 && ', '}
                                {language.name}
                            </span>
                        ))}
                    </span>
                ) : (
                    <span className="no-languages">No spoken languages available.</span>
                )}
            </div>

            {/* Display belongsToCollection if available */}
            {belongsToCollection && (
                <div className="details-belongs-to">
                    <h3>RELATED</h3>
                    <hr className="comment-divider" />
                    <img
                        src={`https://image.tmdb.org/t/p/original${belongsToCollection.poster_path}`}
                        alt={belongsToCollection.name}
                        style={{ width: '140px', height: '190px', borderRadius: '3px', cursor: 'pointer' }}
                        onClick={handlePosterClick} // Add click handler
                    />
                </div>
            )}
            
            {/* Display Reviews */}
            {reviews && reviews.length > 0 && (
                <div className="details-reviews-list">
                    <p className="details-reviews-title">RECENT REVIEWS</p>
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
