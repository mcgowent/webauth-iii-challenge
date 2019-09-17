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

router.get('/hash', (req, res) => {
    const name = req.query.name;

    // hash the name
    const hash = bcrypt.hashSync(name, 8); // use bcryptjs to hash the name
    res.send(`the hash for ${name} is ${hash}`);
});

/*
  write a middleware that will check for the username and password
  and let the request continue to /api/users if credentials are good
  return a 401 if the credentials are invalid

  Use the middleware to restrict access to the GET /api/users endpoint
*/

module.exports = router;