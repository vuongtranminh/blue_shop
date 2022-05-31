package com.blue.shop.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

	@Value("${cors.allowedOrings}")
	private String allowedOrigins;
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
		final long MAX_AGE_SECS = 3600;

        registry.addMapping("/**")
	        .allowedOrigins(allowedOrigins)
	        .allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS")
	        .allowedHeaders("*")
			.maxAge(MAX_AGE_SECS);
    }
	
}
