const loginButton = document.querySelector("#login");
const loginWrapper = document.querySelector(".login-wrapper");
const lang = window.location.pathname.split('/');

loginButton.addEventListener("click", (event) => {
    loginWrapper.classList.toggle("active");
});

function sendTokenToServer(token) {
    fetch('/' + lang[1] + '/google-login', {
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

function onSignInGSI(response) {
    sendTokenToServer(response.credential);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "529448807183-tctbbs5l01n3i1da262d1c5m52vjmlbp.apps.googleusercontent.com",
        callback: onSignInGSI,
    });
    google.accounts.id.renderButton(
        document.getElementById("google-signIn"),
        {
            type: "standard",
            shape: "pill",
            theme: "filled_blue",
            text: "signin_with",
            size: "large",
            logo_alignment: "left",
            locale: lang[1]
        }
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-225478188-1');
