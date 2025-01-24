package com.backlog.moviedatabase.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration // config class 
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() { // simplifies HTTP objects
        return new RestTemplate();
    }
}
