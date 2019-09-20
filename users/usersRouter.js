const express = require('express');
const Users = require('./usersHelpers');
const router = express.Router();
const bcrypt = require('bcryptjs');
const restricted = require('../auth/restricted-middleware');


router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;