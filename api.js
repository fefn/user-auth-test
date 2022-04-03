const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const db = require('./db/db');

const apiRouter = new express.Router();

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

apiRouter.use('/', (req, res, next) => {
    res.setHeader('accept', 'application/json')
    res.setHeader('content-type', 'application/json')

    next();
});

apiRouter.get('/session', (req, res) => {
    res.send(`{
        "username":"jopa"
    }`);
});

apiRouter.post('/login', (req, res) => {
    let errors = [];

    let userdata = req.body;

    let logged = false;
    if (userdata.username == '' || userdata.password == ''){
        errors = [...errors, 'empty fields']
    }

    if (userdata.username.indexOf(" ") != -1 || userdata.password.indexOf(" ") != -1){
        errors = [...errors, 'No spaces']
    }

    if (userdata.username == 'fenix' && userdata.password == '123') {
        logged = true;  
    }

    res.send(JSON.stringify({
        status: logged ? 'success' : 'fail',
        errors
    }));
});

apiRouter.post('/register', async (req, res) => {
    let errors = [];
    
    let userdata = req.body;

    await db.setUser('test', userdata)

    if (userdata.username == '' || userdata.password == '' || userdata.email == '' || userdata.repassword == ''){
        errors = [...errors, 'empty fields']
    }

    if (userdata.username.indexOf(" ") != -1 || userdata.password.indexOf(" ") != -1 || userdata.email.indexOf(" ") != -1 || userdata.repassword.indexOf(" ") != -1){
        errors = [...errors, 'No spaces']
    }
    
    if (!validateEmail(userdata.email)) {
        errors = [...errors, 'invalid email']
    }

    if (userdata.password != userdata.repassword) {
        errors = [...errors, "The passwords don't match"]
    }

    if (errors.length <= 0 ){
        console.log('registering new user: ', userdata);
        
    } else {
        res.send(JSON.stringify({
            status: 'fail',
            errors
        }));
    }
});


module.exports = apiRouter;

