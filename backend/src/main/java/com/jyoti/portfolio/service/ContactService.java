package com.jyoti.portfolio.service;

import com.jyoti.portfolio.model.Contact;
import com.jyoti.portfolio.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final List<Contact> memoryContacts = Collections.synchronizedList(new ArrayList<>());

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Contact saveContact(Contact contact) throws Exception {
        try {
            return contactRepository.save(contact);
        } catch (Exception e) {
            // Log fallback
            System.err.println("⚠️ [Database Failure]: Failed to save contact message to MySQL database: " + e.getMessage());
            System.out.println("ℹ️ [In-Memory Log]: Logging contact message in server memory instead.");
            
            // Assign dummy ID
            contact.setId(System.currentTimeMillis());
            memoryContacts.add(contact);
            
            // Throw exception to indicate fallback path was used (controller handles it)
            throw new RuntimeException("Logged in memory", e);
        }
    }

    public List<Contact> getAllContacts() {
        try {
            return contactRepository.findAll();
        } catch (Exception e) {
            return new ArrayList<>(memoryContacts);
        }
    }
}
