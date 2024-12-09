package com.backlog.moviedatabase.controllers;

import java.util.List;

import com.backlog.moviedatabase.models.TrendingMovies;
import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.models.Movie;
import com.backlog.moviedatabase.models.MovieReview;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.http.HttpMethod;  
import org.springframework.core.ParameterizedTypeReference; 
import org.springframework.web.client.RestTemplate;  

@RestController
@RequestMapping("/api/movies") // concerned with grabbing movie ID's for movie details
public class MovieDetailsController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ApiKeyProvider apiKeyProvider;

    @GetMapping("/details/{movieId}")
    public Movie getTrendingMovie(@PathVariable String movieId) {
        String apiKey = apiKeyProvider.getApiKey();
        String detailsAPI = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey;
        Movie movieDetails = restTemplate.getForObject(detailsAPI, Movie.class); 

        return movieDetails;
    }
}