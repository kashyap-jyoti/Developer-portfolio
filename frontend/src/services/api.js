const API_BASE = '/api';

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
};

export const fetchSkills = async () => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Error fetching skills:', err);
    return [];
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error sending message:', err);
    return { success: false, error: 'Network error connecting to Express backend.' };
  }
};

export const sendAIChatMessage = async (userMessage) => {
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    return await res.json();
  } catch (err) {
    console.error('Error with AI assistant:', err);
    return { success: false, reply: "I am unable to reach the Express backend server right now." };
  }
};
