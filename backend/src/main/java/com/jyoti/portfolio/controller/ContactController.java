package com.jyoti.portfolio.controller;

import com.jyoti.portfolio.dto.ContactDTO;
import com.jyoti.portfolio.model.Contact;
import com.jyoti.portfolio.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createContact(@RequestBody ContactDTO contactDTO) {
        Map<String, Object> response = new HashMap<>();

        if (contactDTO.getName() == null || contactDTO.getName().trim().isEmpty() ||
            contactDTO.getEmail() == null || contactDTO.getEmail().trim().isEmpty() ||
            contactDTO.getMessage() == null || contactDTO.getMessage().trim().isEmpty()) {
            response.put("success", false);
            response.put("error", "Name, email, and message are required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Contact contact = new Contact(
            contactDTO.getName(),
            contactDTO.getEmail(),
            contactDTO.getSubject(),
            contactDTO.getMessage()
        );

        try {
            Contact savedContact = contactService.saveContact(contact);
            response.put("success", true);
            response.put("message", "Message saved to database successfully!");
            response.put("data", savedContact);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception dbErr) {
            // Fallback in-memory entry created during saveContact throw
            response.put("success", true);
            response.put("message", "Message received and logged in server memory!");
            response.put("data", contact);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", contacts.size());
        response.put("data", contacts);
        return ResponseEntity.ok(response);
    }
}
