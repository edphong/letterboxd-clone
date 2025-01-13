import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Dashboard.css"

const Carousel = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (movies.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [movies]);

    const handleDotClick = (index) => setCurrentIndex(index);

    // Handle scroll functionality and prevent page scrolling
    const handleWheel = (event) => {
        event.preventDefault();  // Prevent the default scrolling behavior

        if (event.deltaY > 0) {
            // Scroll down
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        } else {
            // Scroll up
            setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
        }
    };

    useEffect(() => {
        const backdropContainer = document.querySelector(".backdrop-container");

        // Add event listener to prevent page scroll when hovering over the carousel
        backdropContainer?.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            backdropContainer?.removeEventListener('wheel', handleWheel);
        };
    }, [movies]);

    return (
        movies.length > 0 && (
            <div className="backdrop-container">
                <Link to={`/movie/${movies[currentIndex].id}`}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path}`}
                        alt="Backdrop"
                        className="backdrop-image"
                    />
                </Link>
                <div className="hero-content">
                    <h1>{movies[currentIndex].title}</h1>
                    <div className="rating-container">
                        <h2>
                            {(movies[currentIndex].vote_average).toFixed(2) + ' / 10'} {' | '}
                            {new Date(movies[currentIndex].release_date).getFullYear()}

                        </h2>
                    </div>
                    <p>{movies[currentIndex].overview || 'No tagline available'}</p>
                </div>
                <div className="dots-container">
                    {movies.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>
            </div>
        )
    );
};

export default Carousel;
