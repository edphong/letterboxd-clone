package com.backlog.moviedatabase.models;

public class TVShowReview {
    private String author;
    private AuthorDetails author_details;
    private String content;
    private String created_at;
    private String id;
    private String updated_at;
    private String url;

    // Getters and Setters
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public AuthorDetails getAuthor_details() { return author_details; }
    public void setAuthor_details(AuthorDetails author_details) { this.author_details = author_details; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCreated_at() { return created_at; }
    public void setCreated_at(String created_at) { this.created_at = created_at; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUpdated_at() { return updated_at; }
    public void setUpdated_at(String updated_at) { this.updated_at = updated_at; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public class AuthorDetails {
        private String name;
        private String username;
        private String avatar_path;
        private Double rating; // Use Double to handle null ratings
    
        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
    
        public String getAvatar_path() { return avatar_path; }
        public void setAvatar_path(String avatar_path) { this.avatar_path = avatar_path; }
    
        public Double getRating() { return rating; }
        public void setRating(Double rating) { this.rating = rating; }
    }
}
