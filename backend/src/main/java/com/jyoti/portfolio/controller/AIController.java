package com.jyoti.portfolio.controller;

import com.jyoti.portfolio.dto.AIChatRequestDTO;
import com.jyoti.portfolio.dto.AIChatResponseDTO;
import com.jyoti.portfolio.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/ai")
public class AIController {

    private final AIService aiService;

    @Autowired
    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> handleAIChat(@RequestBody AIChatRequestDTO request) {
        if (request == null || request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            Map<String, Object> errResponse = new HashMap<>();
            errResponse.put("success", false);
            errResponse.put("error", "Message field is required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errResponse);
        }

        String reply = aiService.generateReply(request.getMessage());
        AIChatResponseDTO response = new AIChatResponseDTO(true, request.getMessage(), reply);
        return ResponseEntity.ok(response);
    }
}
