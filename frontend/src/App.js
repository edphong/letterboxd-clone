import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import TVShowDetails from "./pages/TVShowDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
                <Route path="/tv-show/:tvShowId" element={<TVShowDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
