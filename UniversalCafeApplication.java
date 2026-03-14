package com.universalcafe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Universal Cafe — Spring Boot Backend
 * Handles reservation form submissions and contact requests.
 *
 * Run: mvn spring-boot:run
 * API Base: http://localhost:8080/api
 */
@SpringBootApplication
public class UniversalCafeApplication {
    public static void main(String[] args) {
        SpringApplication.run(UniversalCafeApplication.class, args);
    }
}
