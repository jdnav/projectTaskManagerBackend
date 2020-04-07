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
        const { project } = req.body.project;

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
        res.status(400).send('There was a problem')
    }
}

// Get all tasks of a user
exports.getTasks = async (req, res) => {

    try {

        // Get project id from request
        const { project } = req.body.project;

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

    // get project name
    const { name } = req.body;

    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        // check for the id
        // console.log(req.params.id);
        let project = await Task.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Task not found!' })
        }

        // verity project owner
        if (project.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        // update
        project = await Task.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        // Response updated
        res.json({ project })

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}

exports.deleteTask = async (req, res) => {

    try {
        // check for the id
        // console.log(req.params.id);
        let project = await Task.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Task not found!' })
        }

        // verity project owner
        if (project.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' })
        }

        // Delete project
        await Task.findOneAndRemove({ _id: req.params.id })

        // Response updated
        res.json({ msg: 'Task deleted successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}