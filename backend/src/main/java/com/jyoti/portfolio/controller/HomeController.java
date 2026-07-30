package com.jyoti.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public String getHome() {
        return "🚀 Java Spring Boot Stack Portfolio Server is running smoothly!";
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("server", "Jyoti Kashyap Java/Spring Boot Backend");
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
}
