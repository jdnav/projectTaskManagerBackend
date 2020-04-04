const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // read JWT header
    const token = req.header('x-auth-token');

    // check if no token
    if (!token) {
        return res.status(401).json('JWT required')
    }

    // validate JWT
    try {
        const encoded = jwt.verify(token, process.env.SECRET);
        req.user = encoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Not valid JWT' })
    }
}