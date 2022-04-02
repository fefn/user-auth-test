let username = 'chlen';

async function loadData() {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        let json = JSON.parse(this.responseText);
        username = json.username;
    }

    xhttp.open('GET', '/api/session', true);
    xhttp.send();
}

async function load() {
    await loadData();

    document.querySelectorAll('#username').forEach(async el => {
        el.innerText = username;
    });
}



