const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password
    const { email, password } = req.body;

    console.log(req.body);
    try {
        // Check that the user is unique
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'This user already exits' });
        }

        // create user
        user = new User(req.body);

        // Hash psw
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // save user
        await user.save();

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