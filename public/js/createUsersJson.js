const bcrypt = require('bcrypt');
const fs = require('fs');

const users = [
    {
        username: 'S10800',
        password: 'password123'
    },
    {
        username: 'S10801',
        password: 'abcdef123'
    }
];

// Hash the passwords using bcrypt
const hashedUsers = users.map(user => ({
    username: user.username,
    password: bcrypt.hashSync(user.password, 10) 
}));

// Write the hashed users to users.json
fs.writeFileSync('users.json', JSON.stringify(hashedUsers, null, 2), (err) => {
    if (err) {
        console.error('Error writing users.json:', err);
    } else {
        console.log('users.json created with hashed passwords:', hashedUsers);
    }
});
console.log('users.json created with hashed passwords:', hashedUsers);
