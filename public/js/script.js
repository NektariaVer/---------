const form = document.querySelector('#login-form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = '/home_page.hbs';
        } else {
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

