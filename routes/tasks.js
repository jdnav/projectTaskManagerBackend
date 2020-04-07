// Routes to create users
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');
const auth = require('../middleware/auth')

// Create users
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'The task name is required').not().isEmpty(),
        check('project', 'The project name is required').not().isEmpty()
    ],
    taskController.createTask
)

// Get all tasks
router.get('/',
    auth,
    taskController.getTasks
);

// Update task
router.put('/:id',
    auth,
    [
        check('name', 'The task name is required').not().isEmpty()
    ],
    function (req, res) { taskController.updateTask(req, res) }
);

// Delete project
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;