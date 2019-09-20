const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                // Token Expired or is invalid
                res.status(401).json({ message: 'Invalid Login or Token Expired.' })
            } else {
                // Token is good
                req.user = { username: decodedToken.username }
                next()
            }
        })
    }
};
