package com.jyoti.portfolio.service;

import com.jyoti.portfolio.model.Skill;
import com.jyoti.portfolio.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final List<Skill> fallbackSkills;

    @Autowired
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;

        // Populate fallback data matching Express backend
        this.fallbackSkills = Arrays.asList(
            new Skill("Core Java 21", "Core Backend", 95, "coffee"),
            new Skill("Data Structures & Algorithms", "Core Backend", 92, "code"),
            new Skill("Spring Boot 3 & Microservices", "Core Backend", 88, "cpu"),
            new Skill("React 18 & Hooks", "Frontend & Java Full Stack", 90, "layers"),
            new Skill("Node.js & Express.js", "Frontend & Java Full Stack", 88, "server"),
            new Skill("MongoDB & Mongoose", "Database & Cloud", 85, "database"),
            new Skill("PostgreSQL & SQL", "Database & Cloud", 86, "database"),
            new Skill("Kafka & Redis", "Database & Cloud", 80, "zap"),
            new Skill("Git & GitHub Actions", "Tools & DevOps", 90, "git-branch"),
            new Skill("Docker & REST APIs", "Tools & DevOps", 84, "box")
        );

        // Map pre-assigned temporary IDs to fallbacks
        for (int i = 0; i < fallbackSkills.size(); i++) {
            fallbackSkills.get(i).setId((long) (i + 1));
        }
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedDatabase() {
        try {
            if (skillRepository.count() == 0) {
                for (Skill s : fallbackSkills) {
                    Skill cleanSkill = new Skill(s.getName(), s.getCategory(), s.getProficiency(), s.getIcon());
                    skillRepository.save(cleanSkill);
                }
                System.out.println("✅ [Database Seed]: Seeded skills into MySQL successfully!");
            }
        } catch (Exception e) {
            System.err.println("⚠️ [Database Warning]: MySQL skill seeding failed (using fallback list): " + e.getMessage());
        }
    }

    public List<Skill> getAllSkills() {
        try {
            List<Skill> skills = skillRepository.findAll();
            if (!skills.isEmpty()) {
                return skills;
            }
            return fallbackSkills;
        } catch (Exception e) {
            return fallbackSkills;
        }
    }
}
