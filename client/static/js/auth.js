async function login() {
    const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            login: document.getElementById('login-login').value,
            password: document.getElementById('login-password').value,
        }),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
    }).then(res => res.json()); 

    if (res.status == 'success') {
        console.log('FUCK YES');
        window.location.href = '/';
    }

    console.log(res)
}

async function register() {
    const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
            email: document.getElementById('register-email').value,
            login: document.getElementById('register-login').value,
            username: document.getElementById('register-username').value,
            password: document.getElementById('register-password').value,
            repassword: document.getElementById('register-repassword').value,
        }),
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
    }).then(res => res.json());
    if (res.status == 'success') {
        console.log('frick yes');
        window.location.href = '/login';
    }

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