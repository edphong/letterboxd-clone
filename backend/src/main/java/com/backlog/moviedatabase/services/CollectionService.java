package com.backlog.moviedatabase.services;

import com.backlog.moviedatabase.models.Collection;
import com.backlog.moviedatabase.models.Movie;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Arrays;

import com.backlog.moviedatabase.config.ApiKeyProvider;

@Service
public class CollectionService {

    private final ApiKeyProvider apiKeyProvider;
    private final RestTemplate restTemplate;

    public CollectionService(ApiKeyProvider apiKeyProvider, RestTemplate restTemplate) {
        this.apiKeyProvider = apiKeyProvider;
        this.restTemplate = restTemplate;
    }

    public Collection getCollectionById(int collectionId) {
        String apiKey = apiKeyProvider.getApiKey(); // Fetch API key using ApiKeyProvider

        // Construct the URL to fetch the collection data
        String url = "https://api.themoviedb.org/3/collection/" + collectionId;
        String requestUrl = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", apiKey)
                .toUriString();

        // Make the API call to TMDb
        CollectionApiResponse response = restTemplate.getForObject(requestUrl, CollectionApiResponse.class);

        if (response != null) {
            // Transform the TMDb API response into your Collection model
            List<Movie> movies = Arrays.asList(response.getParts()); // assuming response.getParts() is an array of Movie objects
            return new Collection(collectionId, response.getName(), response.getOverview(), movies);
        }
        return null; // Return null if no collection found
    }

    // Model to map TMDb API response for Collection
    private static class CollectionApiResponse {
        private String name;
        private String overview;
        private Movie[] parts; // Parts will be an array of movie data

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getOverview() {
            return overview;
        }

        public void setOverview(String overview) {
            this.overview = overview;
        }

        public Movie[] getParts() {
            return parts;
        }

        public void setParts(Movie[] parts) {
            this.parts = parts;
        }
    }
}
