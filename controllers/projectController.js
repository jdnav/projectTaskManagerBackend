const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const project = new Project(req.body);

        // Get the owner from JWT
        project.owner = req.user.id;

        project.save();
        res.json(project);

    } catch (error) {
        res.status(400).send('There was a problem')
    }
}

// Get all project of a user
exports.getProjects = async (req, res) => {

    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const projects = await Project.find({ owner: req.user.id }).sort({ registerDate: -1 });
        res.json(projects);

    } catch (error) {
        res.status(400).send('There was a problem')
    }
}

// Update a project
exports.updateProject = async (req, res) => {

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

        // check whether project exits

        // verity project owner

        // update

    } catch (error) {
        res.status(400).send('There was a problem')
    }
}