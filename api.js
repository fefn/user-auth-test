const bcrypt = require('bcrypt');
const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const db = require('./db/db');

const SALT_ROUNDS = 10;

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
    res.end(JSON.stringify(req.session.logged_user));
});

apiRouter.post('/login', async (req, res) => {
    let errors = [];

    let userdata = req.body;

    let logged = false;
    if (userdata.login == '' || userdata.password == '') {
        errors = [...errors, 'empty fields']
    }

    if (userdata.login.indexOf(" ") != -1 || userdata.password.indexOf(" ") != -1) {
        errors = [...errors, 'No spaces']
    }

    if (errors.length <= 0) {
        let found_user = await db.getUser(userdata.login);

        console.log(found_user);

        bcrypt.compare(userdata.password, found_user.password, (err, resp) => {
            if (!resp) {
                errors = [...errors, 'incorrect password']

                res.end(JSON.stringify({
                    status: 'fail',
                    user_info: {},
                    errors
                }));

                return;
            }

            req.session.logged_user = {
                login: found_user.login,
                username: found_user.username,
                email: found_user.email,
            },

            res.end(JSON.stringify({
                status: 'success',
                user_info: {
                    username: found_user.username,
                    email: found_user.email,
                },
                errors
            }));
        })
    } else {
        res.end(JSON.stringify({
            status: 'fail',
            user_info: {},
            errors
        }));
    };
});

apiRouter.post('/register', async (req, res) => {
    let errors = [];

    let userdata = req.body;

    if (userdata.username == '' || userdata.password == '' || userdata.email == '' || userdata.repassword == '' || userdata.login == '') {
        errors = [...errors, 'empty fields']
    }

    if (userdata.username.indexOf(" ") != -1 || userdata.password.indexOf(" ") != -1 || userdata.email.indexOf(" ") != -1 || userdata.login.indexOf(" ") != -1 || userdata.repassword.indexOf(" ") != -1) {
        errors = [...errors, 'No spaces']
    }

    if (!validateEmail(userdata.email)) {
        errors = [...errors, 'invalid email']
    }

    if (userdata.password != userdata.repassword) {
        errors = [...errors, "The passwords don't match"]
    }

    if (errors.length <= 0) {
        let found_user = await db.getUser(userdata.login);

        if (found_user) {
            errors = [...errors, 'user already exists']
            res.end(JSON.stringify({
                status: 'fail',
                errors
            }));

            return;
        }

        console.log('registering new user: ', userdata);

        bcrypt.hash(userdata.password, SALT_ROUNDS, async (err, hash) => {
            await db.setUser(userdata.login, {
                login: userdata.login,
                username: userdata.username,
                password: hash,
                creation_time: new Date(),
            });
            res.end(JSON.stringify({
                status: 'success',
                errors
            }));
        });
    } else {
        res.end(JSON.stringify({
            status: 'fail',
            errors
        }));
    }
});

apiRouter.post('/logout', async (req, res) =>{
    req.session.logged_user = {};
    res.end();
});

apiRouter.post('/view', async (req, res) =>{

});

module.exports = apiRouter;

