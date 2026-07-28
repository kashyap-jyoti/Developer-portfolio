const knowledgeBase = [
  {
    keywords: ['java', 'spring', 'dsa', 'backend', 'core java'],
    reply: "Jyoti is highly proficient in Java 21, Spring Boot, OOPs, Collections Framework, Multithreading, and Data Structures & Algorithms with over 500+ LeetCode & GFG problems solved!"
  },
  {
    keywords: ['mern', 'react', 'node', 'express', 'mongodb', 'frontend', 'stack'],
    reply: "This portfolio itself is a full MERN stack app! Jyoti builds modular React frontends with modern state management, paired with robust Express REST APIs and MongoDB data models."
  },
  {
    keywords: ['projects', 'work', 'banking', 'algovisualizer'],
    reply: "Jyoti's top projects include an Enterprise Banking System (Spring Boot + Kafka), the Electra MERN AI Portfolio, and the AlgoVisualizer DSA platform. Check out the Projects section!"
  },
  {
    keywords: ['education', 'bca', 'college', 'student', 'degree'],
    reply: "Jyoti is currently pursuing a Bachelor of Computer Applications (BCA) with a focus on Software Engineering, Systems Architecture, and Data Structures."
  },
  {
    keywords: ['contact', 'hire', 'email', 'reach', 'social'],
    reply: "You can reach Jyoti via the Contact form below, email directly at jyotikashyap.dev@gmail.com, or connect on GitHub and LinkedIn!"
  }
];

export const handleAIChat = (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message field is required.' });
  }

  const query = message.toLowerCase();
  let matchedReply = "I am Jyoti's Holographic AI Assistant! I can tell you about her expertise in Java, DSA, MERN Stack, Spring Boot, and featured projects. What would you like to explore?";

  for (const item of knowledgeBase) {
    if (item.keywords.some(kw => query.includes(kw))) {
      matchedReply = item.reply;
      break;
    }
  }

  return res.json({
    success: true,
    userQuery: message,
    reply: matchedReply,
    timestamp: new Date()
  });
};
