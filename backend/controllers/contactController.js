import { Contact } from '../models/Contact.js';

// Temporary in-memory log for when DB is not connected
const memoryContacts = [];

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    try {
      const newContact = new Contact({ name, email, subject: subject || 'General Inquiry', message });
      await newContact.save();
      return res.status(201).json({
        success: true,
        message: 'Message saved to MongoDB successfully!',
        data: newContact
      });
    } catch (dbErr) {
      const fallbackEntry = { id: Date.now(), name, email, subject, message, createdAt: new Date() };
      memoryContacts.push(fallbackEntry);
      return res.status(201).json({
        success: true,
        message: 'Message received and logged in server memory!',
        data: fallbackEntry
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error processing contact message.' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return res.json({ success: true, count: memoryContacts.length, data: memoryContacts });
  }
};
