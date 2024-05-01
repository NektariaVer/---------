import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

//  Read users from users.json
let users;
try {
    const usersData = fs.readFileSync('users.json');
    users = JSON.parse(usersData);
} catch (error) {
    console.error('Error reading users file:', error);
    // If reading fails, use an empty array
    users = [];
}

// Serve login.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(new URL('./login.html', import.meta.url).pathname);
});

// Handle form submission for login
app.post('/login.html', async (req, res) => {
    const { username, password } = req.body;
    
    // Find user by username
    const user = users.find(u => u.username === username);

    if (user) {
        try {
            // Compare the entered password with the hashed password from the database
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Redirect to home_page.html on successful login
                res.redirect('/home_page.html');
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            res.status(500).send('Internal server error');
        }
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
