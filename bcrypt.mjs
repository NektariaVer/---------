import bcrypt from 'bcrypt';

const password = 'password456!';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Hashed password:', hash);
});
