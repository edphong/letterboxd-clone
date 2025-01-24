import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Dashboard.css";

const Carousel = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // states are dynamic, mutable data of a component 

    useEffect(() => { // hook that enables side effects (timers, fetching data) in components 
        if (movies.length === 0) return; // error handler 
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000); // timer of 5 seconds 
        return () => clearInterval(interval);
    }, [movies]);

    const handleDotClick = (index) => setCurrentIndex(index); // handles dot navigation

    // Handle scroll functionality and prevent page scrolling
    const handleWheel = (event) => {
        event.preventDefault();  // Prevent the default scrolling behavior

        if (event.deltaY > 0) {
            // Scroll down through the carousel
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        } else {
            // Scroll up through the carousel
            setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
        }
    };

    useEffect(() => {
        const carouselContainer = document.querySelector(".carousel-backdrop-container");

        // Add event listener to prevent page scroll when hovering over the carousel
        carouselContainer?.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            carouselContainer?.removeEventListener('wheel', handleWheel);
        };
    });

    return ( // returns backdrop attribute of movies from API and backend
        movies.length > 0 && (
            <div className="carousel-backdrop-container">
                <Link to={`/movie/${movies[currentIndex].id}`}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path}`}
                        alt="Backdrop"
                        className="carousel-backdrop-image"
                    />
                </Link>
                <div className="carousel-hero-content">
                    <h1>{movies[currentIndex].title}</h1>
                    <div className="rating-container">
                        <h2>
                            {(movies[currentIndex].vote_average).toFixed(2) + ' / 10'} {' | '}
                            {new Date(movies[currentIndex].release_date).getFullYear()}
                        </h2>
                    </div>
                    <p>{movies[currentIndex].overview || 'No tagline available'}</p>
                </div>
                <div className="carousel-dots-container">
                    {movies.map((_, index) => (
                        <span
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>
            </div>
        )
    );
};

export default Carousel;
