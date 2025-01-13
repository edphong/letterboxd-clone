package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.models.TVShowReview;
import com.backlog.moviedatabase.models.TVShowReviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController // GET method
@RequestMapping("/api/tv-shows")
public class TVShowReviewController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ApiKeyProvider apiKeyProvider;

    @GetMapping("/reviews/{series_id}")
    public List<TVShowReview> getReviews(@PathVariable String series_id) {
        String apiKey = apiKeyProvider.getApiKey();
        String reviewsAPI = "https://api.themoviedb.org/3/tv/" + series_id + "/reviews";
        TVShowReviews response = restTemplate.getForObject(reviewsAPI + "?api_key=" + apiKey, TVShowReviews.class);

        return response.getResults(); // Corrected: accessing the results property correctly
    }
}
