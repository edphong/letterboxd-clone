package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.models.Movie;
import com.backlog.moviedatabase.models.TrendingMovies;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/movies") // Group your API routes
public class HomeController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ApiKeyProvider apiKeyProvider;

    @GetMapping("/trending")
    public List<Movie> getMovies() {
        String trendingAPI = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
        String apiKey = apiKeyProvider.getApiKey();

        // Fetch the movie data from the API
        TrendingMovies response = restTemplate.getForObject(trendingAPI + "&api_key=" + apiKey, TrendingMovies.class);

        // Return the list of movies
        return response.getResults(); // This will return a JSON response
    }
}
