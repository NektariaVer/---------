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
            window.location.href = '/';
        } else {
            const responseData = await response.json();
            alert(responseData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
