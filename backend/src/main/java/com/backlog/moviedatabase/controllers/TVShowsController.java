package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.models.TVShow;
import com.backlog.moviedatabase.models.TVShows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController // GET method 
@RequestMapping("/api/tv") 
public class TVShowsController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ApiKeyProvider apiKeyProvider;

    @GetMapping("/trending")
    public List<TVShow> getTrending() {
        String apiKey = apiKeyProvider.getApiKey();
        String trendingAPIUrl = "https://api.themoviedb.org/3/trending/tv/day?api_key=" + apiKey;
        TVShows response = restTemplate.getForObject(trendingAPIUrl, TVShows.class);
        
        return response.getResults();
    }
    
    /* @GetMapping("/airing-today")
    public List<TVShow> getAiringToday() {
        String apiKey = apiKeyProvider.getApiKey();
        String getAiringAPI = "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1" + apiKey;
        TVShows response = restTemplate.getForObject(getAiringAPI, TVShows.class);
        
        return response.getResults();
    }

    @GetMapping("/on-the-air")
    public List<TVShow> getOnTheAir() {
        String apiKey = apiKeyProvider.getApiKey();
        String getOnTheAirAPI = "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1" + apiKey;
        TVShows response = restTemplate.getForObject(getOnTheAirAPI, TVShows.class);
        
        return response.getResults();
    } */

    @GetMapping("/top-rated")
    public List<TVShow> getTopRated() {
        String apiKey = apiKeyProvider.getApiKey();
        String getTopRatedAPI = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1" + apiKey;
        TVShows response = restTemplate.getForObject(getTopRatedAPI, TVShows.class);
        
        return response.getResults();
    }
}