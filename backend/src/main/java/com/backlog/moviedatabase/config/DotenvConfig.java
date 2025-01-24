package com.backlog.moviedatabase.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration // source of bean definitions, used to configure parts of application 
public class DotenvConfig {
    
    @Bean // marks method as spring bean provider 
    public Dotenv dotenv() { 
        return Dotenv.load(); // static method that loads environment variables from .env
    }
}
