package com.jyoti.portfolio.controller;

import com.jyoti.portfolio.model.Skill;
import com.jyoti.portfolio.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/skills")
public class SkillController {

    private final SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getSkills() {
        List<Skill> skills = skillService.getAllSkills();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", skills.size());
        response.put("data", skills);
        return ResponseEntity.ok(response);
    }
}
