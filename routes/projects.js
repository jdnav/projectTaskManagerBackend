// Routes to create users
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');
const auth = require('../middleware/auth')

// Create users
// api/projects
router.post('/',
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    auth,
    projectController.createProject()
);

router.get('/',
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    auth,
    projectController.createProject()
);

module.exports = router;