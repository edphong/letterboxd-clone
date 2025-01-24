package com.backlog.moviedatabase.config;

import io.github.cdimascio.dotenv.Dotenv; // imports dotenv class, used for reading environmental variables from .env files 
import org.springframework.stereotype.Component;

@Component // spring managed bean, used moduarily to perform single-purpose services (e.g helper clases, service classes)
public class ApiKeyProvider { // Provides access to the API key(s) stored in environmental variables 

    private final Dotenv dotenv;

    public ApiKeyProvider(Dotenv dotenv) {
        this.dotenv = dotenv;
    }

    public String getApiKey() {
        return dotenv.get("API_KEY");
    }
}
