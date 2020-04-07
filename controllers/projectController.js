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
        console.log(error);
        res.status(500).send('There was a problem')
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
        // console.log(req.params.id);
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found!' })
        }

        // verify project owner
        if (project.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' })
        }

        // update
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        // Response updated
        res.json({ project })

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}

exports.deleteProject = async (req, res) => {

    try {
        // check for the id
        // console.log(req.params.id);
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found!' })
        }

        // verity project owner
        if (project.owner.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' })
        }

        // Delete project
        await Project.findOneAndRemove({ _id: req.params.id })

        // Response updated
        res.json({ msg: 'Project deleted successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a problem')
    }
}