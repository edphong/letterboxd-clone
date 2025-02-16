package com.backlog.moviedatabase.controllers;

import com.backlog.moviedatabase.config.ApiKeyProvider;
import com.backlog.moviedatabase.services.TrieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final TrieService trieService;
    private final RestTemplate restTemplate;
    private final ApiKeyProvider apiKeyProvider;

    public SearchController(TrieService trieService, RestTemplate restTemplate, ApiKeyProvider apiKeyProvider) {
        this.trieService = trieService;
        this.restTemplate = restTemplate;
        this.apiKeyProvider = apiKeyProvider;
    }

    @GetMapping
    public List<Map<String, Object>> search(@RequestParam String query) {
        // Step 1: Get results from the Trie (prefix match)
        List<Map<String, Object>> trieResults = trieService.searchPrefix(query)
            .stream()
            .map(title -> createSearchResult(title, null, "movie"))
            .collect(Collectors.toList());

        // Step 2: If there are fewer than 5 results, call the API to get more matches
        if (trieResults.size() < 5) {
            List<Map<String, Object>> apiResults = fetchFromApi(query);
            // Combine and return unique results, up to a total of 5
            Set<Map<String, Object>> allResults = new LinkedHashSet<>(trieResults);
            allResults.addAll(apiResults);
            return allResults.stream().limit(5).collect(Collectors.toList());
        }

        return trieResults.stream().limit(5).collect(Collectors.toList());
    }

    private List<Map<String, Object>> fetchFromApi(String query) {
        String apiKey = apiKeyProvider.getApiKey();
        String url = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&query=" + query;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> results = response != null ? (List<Map<String, Object>>) response.get("results") : new ArrayList<>();

        // Extract titles, ids, and media types (movie or tv show)
        List<Map<String, Object>> movieData = new ArrayList<>();
        for (Map<String, Object> item : results) {
            String title = (String) item.get("title");
            String name = (String) item.get("name");
            Integer id = (Integer) item.get("id");
            String mediaType = (String) item.get("media_type");

            if ((title != null || name != null) && id != null) {
                if (mediaType != null && (mediaType.equals("movie") || mediaType.equals("tv"))) {
                    String displayTitle = (mediaType.equals("movie")) ? title : name;
                    movieData.add(createSearchResult(displayTitle, id, mediaType));
                }
            }
        }
        return movieData;
    }

    private Map<String, Object> createSearchResult(String title, Integer id, String mediaType) {
        Map<String, Object> result = new HashMap<>();
        result.put("title", title);
        result.put("id", id);
        result.put("mediaType", mediaType); // Add media type to distinguish between movie and tv show
        return result;
    }
}
