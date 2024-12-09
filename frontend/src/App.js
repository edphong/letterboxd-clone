import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrendingPage from "./components/TrendingPage";
import MovieDetails from "./components/MovieDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define routes */}
                <Route path="/" element={<TrendingPage />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
