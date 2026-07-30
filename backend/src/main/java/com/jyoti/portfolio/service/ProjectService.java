package com.jyoti.portfolio.service;

import com.jyoti.portfolio.model.Project;
import com.jyoti.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final List<Project> fallbackProjects;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;

        // Populate the fallback data matching Express backend
        Project p1 = new Project(
            "Enterprise Banking & Payments System",
            "High-Throughput Core Banking Platform",
            "Java & Spring Boot",
            "Scalable distributed banking backend supporting double-entry ledger transactions, JWT authentication, and Kafka event streaming.",
            "Engineered with Spring Boot 3, Spring Security, Apache Kafka, PostgreSQL, and Redis caching. Achieved sub-50ms transaction latency with multi-layer ACID compliance and circuit-breaker fault tolerance.",
            Arrays.asList("Java 21", "Spring Boot", "Spring Security", "Kafka", "PostgreSQL", "Redis"),
            "https://github.com/Kashyap-jyoti/Banking-Platform",
            "https://github.com/Kashyap-jyoti",
            true, 48, 14
        );
        p1.setId(1L);

        Project p2 = new Project(
            "Electra AI Portfolio Platform",
            "Java Full Stack + AI Holographic Assistant",
            "Java Full Stack",
            "Ultra-modern portfolio web app powered by React 18, Express backend, MongoDB integration, and an embedded holographic AI guide.",
            "Built using React, Vite, Node.js, Express, and Mongoose. Features custom dark glassmorphic UI, GSAP micro-animations, instant command palette, and interactive chat API.",
            Arrays.asList("MongoDB", "Express", "React", "Node.js", "GSAP", "CSS Modules"),
            "https://github.com/Kashyap-jyoti/Developer-portfolio",
            "https://kashyap-jyoti.github.io",
            true, 62, 19
        );
        p2.setId(2L);

        Project p3 = new Project(
            "AlgoVisualizer DSA Suite",
            "Interactive Data Structures & Algorithm Visualizer",
            "Algorithms",
            "Step-by-step visual engine for Graph Traversals (Dijkstra, A*), Sorting Algorithms, Dynamic Programming, and Binary Search Trees.",
            "Allows computer science students to visualize state changes in memory across recursion trees, graph edges, and array swaps in real time with configurable speed controls.",
            Arrays.asList("Java", "React", "DSA", "Canvas API", "Graph Theory"),
            "https://github.com/Kashyap-jyoti/AlgoVisualizer",
            "https://github.com/Kashyap-jyoti",
            true, 35, 8
        );
        p3.setId(3L);

        Project p4 = new Project(
            "Microservices E-Commerce Core",
            "Distributed Microservices Architecture",
            "Backend Architecture",
            "E-commerce microservices with API Gateway, Eureka Service Discovery, Config Server, and Docker deployment.",
            "Decoupled services for Product Catalog, Order Management, Payment Processing, and Notification service using Spring Cloud and RabbitMQ.",
            Arrays.asList("Spring Cloud", "Docker", "RabbitMQ", "MongoDB", "REST API"),
            "https://github.com/Kashyap-jyoti",
            "https://github.com/Kashyap-jyoti",
            false, 29, 5
        );
        p4.setId(4L);

        this.fallbackProjects = Arrays.asList(p1, p2, p3, p4);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedDatabase() {
        try {
            if (projectRepository.count() == 0) {
                // Remove pre-assigned IDs so DB assigns auto-increment keys
                for (Project p : fallbackProjects) {
                    Project cleanProject = new Project(
                        p.getTitle(), p.getSubtitle(), p.getCategory(), p.getDescription(), p.getLongDescription(),
                        p.getTags(), p.getGithubUrl(), p.getLiveUrl(), p.isFeatured(), p.getStars(), p.getForks()
                    );
                    projectRepository.save(cleanProject);
                }
                System.out.println("✅ [Database Seed]: Seeded projects into MySQL successfully!");
            }
        } catch (Exception e) {
            System.err.println("⚠️ [Database Warning]: MySQL project seeding failed (using fallback list): " + e.getMessage());
        }
    }

    public List<Project> getAllProjects() {
        try {
            List<Project> projects = projectRepository.findAll();
            if (!projects.isEmpty()) {
                return projects;
            }
            return fallbackProjects;
        } catch (Exception e) {
            return fallbackProjects;
        }
    }

    public Project getProjectById(Long id) {
        try {
            Optional<Project> project = projectRepository.findById(id);
            if (project.isPresent()) {
                return project.get();
            }
            return fallbackProjects.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(fallbackProjects.get(0));
        } catch (Exception e) {
            return fallbackProjects.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(fallbackProjects.get(0));
        }
    }
}
