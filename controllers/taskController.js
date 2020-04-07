const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Get project id from request
        const { project } = req.body;

        // Check project
        const projectCheck = await Project.findById(project);
        if (!projectCheck) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        // Check whether project belongs to user loggedin
        if (projectCheck.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unthorized' })
        }

        // Create task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });


    } catch (error) {
        res.status(500).send('There was a problem')
    }
}

// Get all tasks of a user
exports.getTasks = async (req, res) => {

    try {

        // Get project id from request
        const { project } = req.body;

        // Check project
        const projectCheck = await Project.findById(project);
        if (!projectCheck) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        // Check whether project belongs to user loggedin
        if (projectCheck.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unthorized' })
        }

        // Get tasks from project
        const tasks = await Task.find({ project });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}

// Update a project
exports.updateTask = async (req, res) => {

    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Get params from request body
        const { name, project, status } = req.body;

        // Check whether task exits
        let task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task does not exits' })
        }

        // Get project
        const projectCheck = await Project.findById(project);

        // Check whether project belongs to user loggedin
        if (projectCheck.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unthorized' })
        }

        // Create object with new info
        const newTask = {};
        if (nombre) newTask.name = name;
        if (status) newTask.status = status;

        // Update task
        task = await Task.findOneAndUpdate({ _id: res.params.id }, newTask, { new: true });
        res.json({ task })

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}

exports.deleteTask = async (req, res) => {

    try {
        // Get params from request body
        const { project } = req.body;

        // Check whether task exits
        let task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({ msg: 'Task does not exits' })
        }

        // Get project
        const projectCheck = await Project.findById(project);

        // Check whether project belongs to user loggedin
        if (projectCheck.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unthorized' })
        }

        // Delete task
        await Task.findOneAndRemove({ _id: req.params.id })

        // Response delete
        res.json({ msg: 'Project deleted successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}