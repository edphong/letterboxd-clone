package com.backlog.moviedatabase.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow cross-origin requests to all endpoints
                .allowedOrigins("http://localhost:3000") // Allow requests from React app
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow cookies or credentials in the request
    }
}

// cross origin resourcec sharing class impleneted in web browsers to control how resources on a server can be accessed by web pages from different orgins 
