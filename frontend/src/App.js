import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MovieDetails from "./pages/MovieDetails";
import TVShowDetails from "./pages/TVShowDetails";
import BelongsToCollection from "./pages/BelongsTo";
import NavBar from './components/NavBar'; 

const App = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
                <Route path="/tv-show/:tvShowId" element={<TVShowDetails />} />
                <Route path="/movie/collection/:collectionId" element={<BelongsToCollection />} /> {/* New Route */}
            </Routes>
        </Router>
    );
};

export default App;
