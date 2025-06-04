const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let users = [];
let questions = [];

// Register user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'Registered successfully' });
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', username });
});

// Post a question
app.post('/questions', (req, res) => {
    const { title, topic } = req.body;
    questions.push({ title, topic });
    res.status(201).json({ message: 'Question posted' });
});

// Get all questions
app.get('/questions', (req, res) => {
    res.json(questions);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});