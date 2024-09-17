// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the signup form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Load existing users
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath);
        users = JSON.parse(usersData);
    }

    // Add new user to the list
    users.push({ username, email, password });

    // Save the updated users list back to the JSON file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    console.log('Data saved successfully');
    res.send('Signup successful!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
