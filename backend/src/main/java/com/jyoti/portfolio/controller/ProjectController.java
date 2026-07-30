package com.jyoti.portfolio.controller;

import com.jyoti.portfolio.model.Project;
import com.jyoti.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProjects() {
        List<Project> projects = projectService.getAllProjects();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", projects.size());
        response.put("data", projects);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProjectById(@PathVariable String id) {
        Long longId;
        try {
            longId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            // Fallback default
            longId = 1L;
        }
        Project project = projectService.getProjectById(longId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", project);
        return ResponseEntity.ok(response);
    }
}
