require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

const api = require('./api');



app.use(express.static(path.join('client', 'static')));


app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: true, 
    saveUninitialized: false,
    cookie: {
        maxAge: 3153600000,
    }
}))

app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'pages', 'login', 'index.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'pages', 'register', 'index.html'))
});


app.listen(3000);