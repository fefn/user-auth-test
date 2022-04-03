let data = {};

function updateUI() {
    document.querySelectorAll('#username').forEach(async el => {
        el.innerText = data.username ? data.username : '';
    });
}

async function loadData() {

    const res = await fetch('/api/session', {
        method: 'GET',
    }).then(res => res.json());

    return res;
}

async function load() {
    data = await loadData();
    updateUI();
}

load();

