import bcrypt from 'bcrypt';

const hash = '$2b$10$Zxi8QWN05A8tHMBhh50EXumQqTd7yJn4Fd7m7nncHI1AkUDonKEgW';
const plainTextPassword = 'password123';  // Replace this with the password you want to check

bcrypt.compare(plainTextPassword, hash, (err, result) => {
    if (err) {
        console.error('Error comparing passwords:', err);
    } else {
        if (result) {
            console.log('The password is correct.');
        } else {
            console.log('The password is incorrect.');
        }
    }
});
