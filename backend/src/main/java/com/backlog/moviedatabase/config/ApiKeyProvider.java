package com.backlog.moviedatabase.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

@Component
public class ApiKeyProvider {

    private final Dotenv dotenv;

    public ApiKeyProvider(Dotenv dotenv) {
        this.dotenv = dotenv;
    }

    public String getApiKey() {
        return dotenv.get("API_KEY");
    }
}
