// Routes to create users
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');
const auth = require('../middleware/auth')

// Create users
// api/projects
router.post('/',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    function (req, res) { projectController.createProject(req, res) }
);

// Get all projects
router.get('/',
    auth,
    function (req, res) { projectController.getProjects(req, res) }
);

// Update project
router.put('/:id',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    function (req, res) { projectController.updateProject(req, res) }
);

// Delete project
router.delete('/:id',
    projectController.deleteProject
);

module.exports = router;