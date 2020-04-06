// Routes to create users
const express = require('express');
const router = express.Router();
// controller
const userController = require('../controllers/userController');
// validator
const { check } = require('express-validator');

// Create users
// api/users
router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is not valid').isEmail(),
        check('password', 'The password must contain at least 6 characters').isLength({ min: 6 }),
    ],
    function (req, res) { userController.createUser(req, res) });

module.exports = router;