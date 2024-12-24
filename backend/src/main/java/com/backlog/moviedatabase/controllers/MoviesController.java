package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.models.Movie;
import com.backlog.moviedatabase.models.Movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController // GET method
@RequestMapping("/api/movies") // Group your API routes
public class MoviesController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ApiKeyProvider apiKeyProvider;

    @GetMapping("/trending") 
    public List<Movie> getTrending() {
        String apiKey = apiKeyProvider.getApiKey();
        String trendingAPI = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
        Movies response = restTemplate.getForObject(trendingAPI + "&api_key=" + apiKey, Movies.class);

        return response.getResults(); 
    }

    @GetMapping("/now-showing") 
    public List<Movie> getNowShowing() {
        String apiKey = apiKeyProvider.getApiKey();
        String nowShowingAPI = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
        Movies response = restTemplate.getForObject(nowShowingAPI + "&api_key=" + apiKey, Movies.class);

        return response.getResults(); 
    }

    @GetMapping("/top-rated") 
    public List<Movie> getTopRated() {
        String apiKey = apiKeyProvider.getApiKey();
        String topRatedAPI = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        Movies response = restTemplate.getForObject(topRatedAPI + "&api_key=" + apiKey, Movies.class);

        return response.getResults(); 
    }

    @GetMapping("/upcoming") 
    public List<Movie> getUpcoming() {
        String apiKey = apiKeyProvider.getApiKey();
        String upComingAPI = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
        Movies response = restTemplate.getForObject(upComingAPI + "&api_key=" + apiKey, Movies.class);

        return response.getResults(); 
    }

}

// package com.backlog.moviedatabase.models;
