const User = require('../models/User')

exports.createUser = async (req, res) => {
    
    console.log(req.body);
    try { 
        let user;

        // create user
        user = new User(req.body);

        // save user
        await user.save();

        // Response
        res.send('User created successfully')

    } catch (error) {
        res.status(400).send('There was a problem')
    }

}