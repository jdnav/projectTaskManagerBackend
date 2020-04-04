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