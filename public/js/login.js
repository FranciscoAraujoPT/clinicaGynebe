const loginButton = document.querySelector(".login");
const loginWrapper = document.querySelector(".login-wrapper");

loginButton.addEventListener("click", (event) => {
    loginWrapper.classList.toggle("active");
});

function onSignIn(googleUser) {
    // Get the Google ID token and other user information
    var id_token = googleUser.getAuthResponse().id_token;
    var name = googleUser.getBasicProfile().getName();
    var email = googleUser.getBasicProfile().getEmail();
    // Send the id_token to your server for authentication
    sendTokenToServer(id_token);
}

function sendTokenToServer(token) {
    fetch('/google-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: token }),
    })
        .then(response => {
            if (response.ok) {
                console.log('User logged in successfully');
            } else {
                console.error('Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

gapi.load('client:auth2', function () {
    gapi.client.init({
        clientId: '529448807183 - tctbbs5l01n3i1da262d1c5m52vjmlbp.apps.googleusercontent.com',
    }).then(function () {
        console.log('Google API client initialized');
    });
});