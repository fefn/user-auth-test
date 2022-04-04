

let data = {};

function updateUI() {
    document.querySelectorAll('#username').forEach(async el => {
        el.innerText = data.username ? data.username : '';
    });

    let navlog = document.getElementById('login-logout');
    if (navlog) {
        if (data.username){
            navlog.innerHTML = `
            <li class="nav-item"><a href="#" id="logout" class="nav-link link-dark px-2">Log Out</a></li>
            `;

            document.getElementById('logout').onclick = async () => {
                await fetch('/api/logout', {
                    method: 'POST',
                });

                window.location.href = '/login';
            };
        } else {
            navlog.innerHTML = `
            <li class="nav-item"><a href="/login" class="nav-link link-dark px-2">Log in</a></li>
            <li class="nav-item"><a href="/register" class="nav-link link-dark px-2">Sign up</a></li>
            `;
        }
    }
}

async function loadData() {

    const res = await fetch('/api/session', {
        method: 'GET',
    }).then(res => res.text());
    return res ? JSON.parse(res) : {};
}

async function load() {
    data = await loadData();
    updateUI();
}

load();

