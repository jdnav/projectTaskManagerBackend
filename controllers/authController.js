const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get email and psw
    const { email, password } = req.body;

    try {
        // Check the user is registered
        let user = await User.findOne({ email });
        if (!user) { res.status(400).json('The user does not exists'); }

        // check psw
        const pswCorrect = await bcryptjs.compare(password, user.password);
        if (!pswCorrect) { res.status(400).json('User + Password do not match'); }

        // Create and sign JWT
        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //1h
        }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        });

        // Response
        res.send('User created successfully')

    } catch (error) {
        res.status(400).send('There was a problem')
    }
}
