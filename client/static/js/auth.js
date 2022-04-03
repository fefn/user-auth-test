async function login() {
    const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value,
        }),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
    }).then(res => res.text());

    console.log(res)
}

async function register() {
    const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
            email: document.getElementById('register-email').value,
            username: document.getElementById('register-username').value,
            password: document.getElementById('register-password').value,
            repassword: document.getElementById('register-repassword').value,
        }),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
    }).then(res => res.text());

    console.log(res)
}

if (document.getElementById('login-form')) document.getElementById('login-form').onsubmit = (event) => {
    event.preventDefault();
    login();
};

if (document.getElementById('register-form')) document.getElementById('register-form').onsubmit = (event) => {
    event.preventDefault();
    register();
};