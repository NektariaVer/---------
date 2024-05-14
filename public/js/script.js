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


document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordButton = document.getElementById('forgot-password');
    const forgotPasswordPopup = document.getElementById('forgot-password-popup');
    const closeForgotPasswordPopupButton = document.getElementById('close-forgot-password-popup');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    forgotPasswordButton.addEventListener('click', function() {
        forgotPasswordPopup.style.display = 'block';
    });

    closeForgotPasswordPopupButton.addEventListener('click', function() {
        forgotPasswordPopup.style.display = 'none';
    });

    forgotPasswordForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;

        // Code to send the password reset email 

        // For now, just log the email
        console.log('Email submitted:', email);

        // Close the popup
        forgotPasswordPopup.style.display = 'none';
    });
});


