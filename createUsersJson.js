import bcrypt from 'bcrypt';
import fs from 'fs';

// Sample user data with plain-text passwords
const users = [
    {
        username: 'user1',
        password: 'password123'
    },
    {
        username: 'user2',
        password: 'abcdef123'
    }
];

// Hash the passwords using bcrypt
const hashedUsers = users.map(user => ({
    username: user.username,
    // Hash the password synchronously (for simplicity here)
    password: bcrypt.hashSync(user.password, 10) // Hash with salt rounds = 10
}));

// Write the hashed users to users.json
fs.writeFileSync('users.json', JSON.stringify(hashedUsers, null, 2));

console.log('users.json created with hashed passwords:', hashedUsers);
