const router = require('express').Router();
const Users = require('./usersHelpers');
// middleware
const restricted = require('../auth/restricted-middleware');


router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;