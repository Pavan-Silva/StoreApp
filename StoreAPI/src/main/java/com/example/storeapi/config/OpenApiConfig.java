package com.example.storeapi.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Sample Project",
                description = "Dev - Pavan Silva"
        )
)
public class OpenApiConfig {
}
