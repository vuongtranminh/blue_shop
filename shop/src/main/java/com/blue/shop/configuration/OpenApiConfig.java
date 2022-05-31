package com.blue.shop.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

	@Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                // Thiết lập các server dùng để test api
                .servers(Arrays.asList(
                        new Server().url("http://localhost:8080"),
                        new Server().url("http://localhost:8090")
                ))
                // info
                .info(new Info().title("BlueShop Application API")
                                .description("BlueShop document API")
                                .contact(new Contact()
                                                 .email("blueshop@gmai.com")
                                                 .name("BlueShop")
                                                 .url("https://www.facebook.com/minhvuong1005/"))
                                .license(new License()
                                                 .name("Apache 2.0")
                                                 .url("http://www.apache.org/licenses/LICENSE-2.0.html"))
                                .version("1.0.0"));
    }
	
}
