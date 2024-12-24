package com.backlog.moviedatabase.models;

import java.util.List;

public class TVShows {
    private int page;
    private List<TVShow> results; // List of movies
    private int totalPages;
    private int totalResults;

    // Getters and Setters
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public List<TVShow> getResults() { return results; }
    public void setResults(List<TVShow> results) { this.results = results; }

    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }

    public int getTotalResults() { return totalResults; }
    public void setTotalResults(int totalResults) { this.totalResults = totalResults; }
}
