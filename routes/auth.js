// Routes to create users
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
// controller
const authController = require('../controllers/authController');
// validator
const { check } = require('express-validator');

// Create users
// api/auth
router.post('/',
    [
        check('email', 'The email is not valid').isEmail(),
        check('password', 'The password must contain at least 6 characters').isLength({ min: 6 }),
    ],
    function (req, res) { authController.authUser(req, res) }
);

// Keep user authenticated
router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;