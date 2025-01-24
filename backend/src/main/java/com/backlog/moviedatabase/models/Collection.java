package com.backlog.moviedatabase.models;

import java.util.List;

public class Collection {
    private int id;
    private String name;
    private String overview;
    private List<Movie> parts;

    public Collection(int id, String name, String overview, List<Movie> parts) {
        this.id = id;
        this.name = name;
        this.overview = overview;
        this.parts = parts;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public List<Movie> getParts() {
        return parts;
    }

    public void setParts(List<Movie> parts) {
        this.parts = parts;
    }
}
