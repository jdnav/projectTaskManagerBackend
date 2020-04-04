// Routes to create users
const express = require('express');
const router = express.Router();
// controller
const userController = require('../controllers/userController')

// Create users
// api/users
router.post('/', userController.createUser());

module.exports = router;