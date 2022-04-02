const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join('client', 'static')));

app.get('/', (req, res ) =>{
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
});

app.get('/login', (req, res ) =>{
    res.sendFile(path.join(__dirname, 'client', 'pages', 'login', 'index.html'))
});

app.get('/register', (req, res ) =>{
    res.sendFile(path.join(__dirname, 'client', 'pages', 'register', 'index.html'))
});

app.listen(3000);