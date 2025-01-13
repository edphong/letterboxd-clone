package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.models.TVShow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.PathVariable;

@RestController // GET method
@RequestMapping("/api/tv-shows") // concerned with grabbing movie ID's for movie details
public class TVShowsDetailsController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ApiKeyProvider apiKeyProvider;

    @GetMapping("/details/{tvShowsId}")
    public TVShow getTrendingMovie(@PathVariable String tvShowsId) {
        String apiKey = apiKeyProvider.getApiKey();
        String detailsAPI = "https://api.themoviedb.org/3/tv/" + tvShowsId + "?api_key=" + apiKey; 
        TVShow tvShowDetails = restTemplate.getForObject(detailsAPI, TVShow.class); 

        return tvShowDetails;
    }
}
