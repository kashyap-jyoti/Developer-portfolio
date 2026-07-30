package com.jyoti.portfolio.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AIService {

    private static class KnowledgeItem {
        List<String> keywords;
        String reply;

        KnowledgeItem(List<String> keywords, String reply) {
            this.keywords = keywords;
            this.reply = reply;
        }
    }

    private final List<KnowledgeItem> knowledgeBase;
    private final String defaultReply = "I am Jyoti's Holographic AI Assistant! I can tell you about her expertise in Java, DSA, Java Full Stack, Spring Boot, and featured projects. What would you like to explore?";

    public AIService() {
        knowledgeBase = new ArrayList<>();
        knowledgeBase.add(new KnowledgeItem(
            Arrays.asList("java", "spring", "dsa", "backend", "core java"),
            "Jyoti is highly proficient in Java 21, Spring Boot, OOPs, Collections Framework, Multithreading, and Data Structures & Algorithms with over 500+ LeetCode & GFG problems solved!"
        ));
        knowledgeBase.add(new KnowledgeItem(
            Arrays.asList("java full stack", "fullstack", "react", "node", "express", "mongodb", "frontend", "stack"),
            "This portfolio is built as a Java Full Stack application! Jyoti builds modular React frontends with modern state management, paired with robust Spring Boot REST APIs and database models."
        ));
        knowledgeBase.add(new KnowledgeItem(
            Arrays.asList("projects", "work", "banking", "algovisualizer"),
            "Jyoti's top projects include an Enterprise Banking System (Spring Boot + Kafka), the Electra Java Full Stack AI Portfolio, and the AlgoVisualizer DSA platform. Check out the Projects section!"
        ));
        knowledgeBase.add(new KnowledgeItem(
            Arrays.asList("education", "bca", "college", "student", "degree"),
            "Jyoti is currently pursuing a Bachelor of Computer Applications (BCA) with a focus on Software Engineering, Systems Architecture, and Data Structures."
        ));
        knowledgeBase.add(new KnowledgeItem(
            Arrays.asList("contact", "hire", "email", "reach", "social"),
            "You can reach Jyoti via the Contact form below, email directly at jyotikashyap.dev@gmail.com, or connect on GitHub and LinkedIn!"
        ));
    }

    public String generateReply(String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return defaultReply;
        }

        String query = userMessage.toLowerCase();

        for (KnowledgeItem item : knowledgeBase) {
            for (String keyword : item.keywords) {
                if (query.contains(keyword)) {
                    return item.reply;
                }
            }
        }

        return defaultReply;
    }
}
